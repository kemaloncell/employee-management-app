import { LitElement, html } from 'lit';
import { cssVariables, buttonStyles, tableStyles, cardStyles } from '../styles/shared-styles.js';
import { employeeListStyles } from '../styles/employee-list-styles.js';
import { store } from '../store/store.js';
import { deleteEmployee, setViewMode } from '../store/actions.js';
import { router } from '../router/index.js';
import { t } from '../locales/index.js';
import { formatDate, formatPhone } from '../utils/formatters.js';
import '../components/action-buttons.js';
import '../components/confirm-dialog.js';
import '../components/app-pagination.js';

export class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String },
    searchTerm: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    deleteDialogOpen: { type: Boolean },
    employeeToDelete: { type: Object }
  };

  static styles = [
    cssVariables,
    buttonStyles,
    tableStyles,
    cardStyles,
    employeeListStyles
  ];

  constructor() {
    super();
    this.employees = [];
    this.viewMode = 'table';
    this.searchTerm = '';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.deleteDialogOpen = false;
    this.employeeToDelete = null;
    this.unsubscribe = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe((state) => {
      this.employees = state.employees;
      this.viewMode = state.viewMode;
    });

    const state = store.getState();
    this.employees = state.employees;
    this.viewMode = state.viewMode;

    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    window.removeEventListener('language-changed', () => this.requestUpdate());
  }

  _getFilteredEmployees() {
    if (!this.searchTerm) return this.employees;

    const term = this.searchTerm.toLowerCase();
    return this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term)
    );
  }

  _getPaginatedEmployees() {
    const filtered = this._getFilteredEmployees();
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return filtered.slice(start, end);
  }

  _getTotalPages() {
    const filtered = this._getFilteredEmployees();
    return Math.ceil(filtered.length / this.itemsPerPage);
  }

  _handleSearch(e) {
    this.searchTerm = e.target.value;
    this.currentPage = 1;
  }

  _handleViewModeChange(mode) {
    setViewMode(mode);
  }

  _handleAddNew() {
    router.navigate('/add');
  }

  _handleEdit(employee) {
    router.navigate(`/edit/${employee.id}`);
  }

  _handleDeleteClick(employee) {
    this.employeeToDelete = employee;
    this.deleteDialogOpen = true;
  }

  _handleDeleteConfirm() {
    if (this.employeeToDelete) {
      deleteEmployee(this.employeeToDelete.id);
      this.deleteDialogOpen = false;
      this.employeeToDelete = null;
    }
  }

  _handleDeleteCancel() {
    this.deleteDialogOpen = false;
    this.employeeToDelete = null;
  }

  _handlePageChange(e) {
    this.currentPage = e.detail.page;
  }

  _renderTableView() {
    const employees = this._getPaginatedEmployees();

    if (employees.length === 0) {
      return html`
        <div class="empty-state">
          <p>${t('list.noEmployees')}</p>
        </div>
      `;
    }

    return html`
      <table class="table">
        <thead>
          <tr>
            <th>${t('form.firstName')}</th>
            <th>${t('form.lastName')}</th>
            <th>${t('form.email')}</th>
            <th>${t('form.department')}</th>
            <th>${t('form.position')}</th>
            <th>${t('form.dateOfEmployment')}</th>
            <th>${t('list.actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${employees.map(emp => html`
            <tr>
              <td>${emp.firstName}</td>
              <td>${emp.lastName}</td>
              <td>${emp.email}</td>
              <td>${t(`departments.${emp.department}`)}</td>
              <td>${t(`positions.${emp.position}`)}</td>
              <td>${formatDate(emp.dateOfEmployment)}</td>
              <td>
                <action-buttons
                  mode="icon"
                  @edit-click="${() => this._handleEdit(emp)}"
                  @delete-click="${() => this._handleDeleteClick(emp)}"
                ></action-buttons>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  _renderCardView() {
    const employees = this._getPaginatedEmployees();

    if (employees.length === 0) {
      return html`
        <div class="empty-state">
          <p>${t('list.noEmployees')}</p>
        </div>
      `;
    }

    return html`
      <div class="cards-container">
        ${employees.map(emp => html`
          <div class="card">
            <div class="card-header">
              <h3>${emp.firstName} ${emp.lastName}</h3>
            </div>
            <div class="card-body">
              <p><strong>${t('form.email')}:</strong> ${emp.email}</p>
              <p><strong>${t('form.phone')}:</strong> ${formatPhone(emp.phone)}</p>
              <p><strong>${t('form.department')}:</strong> ${t(`departments.${emp.department}`)}</p>
              <p><strong>${t('form.position')}:</strong> ${t(`positions.${emp.position}`)}</p>
              <p><strong>${t('form.dateOfBirth')}:</strong> ${formatDate(emp.dateOfBirth)}</p>
              <p><strong>${t('form.dateOfEmployment')}:</strong> ${formatDate(emp.dateOfEmployment)}</p>
            </div>
            <div class="card-footer">
              <action-buttons
                mode="icon-text"
                .editLabel="${t('list.edit')}"
                .deleteLabel="${t('list.delete')}"
                @edit-click="${() => this._handleEdit(emp)}"
                @delete-click="${() => this._handleDeleteClick(emp)}"
              ></action-buttons>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    const totalPages = this._getTotalPages();

    return html`
      <div class="header">
        <h1>${t('list.title')}</h1>
        <div class="controls">
          <input
            type="text"
            class="search-box"
            placeholder="${t('list.search')}"
            .value="${this.searchTerm}"
            @input="${this._handleSearch}"
          />
          <div class="view-toggle">
            <button
              class="view-btn ${this.viewMode === 'table' ? 'active' : ''}"
              @click="${() => this._handleViewModeChange('table')}"
            >
              📊
            </button>
            <button
              class="view-btn ${this.viewMode === 'card' ? 'active' : ''}"
              @click="${() => this._handleViewModeChange('card')}"
            >
              📇
            </button>
          </div>
          <button class="btn btn-primary" @click="${this._handleAddNew}">
            ${t('list.addNew')}
          </button>
        </div>
      </div>

      ${this.viewMode === 'table' ? this._renderTableView() : this._renderCardView()}

      ${totalPages > 1 ? html`
        <app-pagination
          .currentPage="${this.currentPage}"
          .totalPages="${totalPages}"
          @page-change="${this._handlePageChange}"
        ></app-pagination>
      ` : ''}

      <confirm-dialog
        ?open="${this.deleteDialogOpen}"
        .title="${t('list.confirmDelete')}"
        .message="${t('list.confirmDeleteMessage')}"
        @confirm="${this._handleDeleteConfirm}"
        @cancel="${this._handleDeleteCancel}"
      ></confirm-dialog>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
