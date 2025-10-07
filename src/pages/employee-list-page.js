import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { store } from '../store/store.js';
import { deleteEmployee, setViewMode } from '../store/actions.js';
import { t } from '../locales/index.js';
import { formatDate, formatPhone } from '../utils/formatters.js';
import { VIEW_MODES } from '../constants/index.js';
import { employeeListStyles } from '../styles/employee-list-styles.js';
import '../components/confirm-dialog.js';
import '../components/action-buttons.js';
import '../components/app-pagination.js';
import '../components/page-header.js';

export class EmployeeListPage extends LitElement {
  static properties = {
    employees: { type: Array },
    filteredEmployees: { type: Array },
    viewMode: { type: String },
    searchTerm: { type: String },
    currentPage: { type: Number },
    pageSize: { type: Number },
    showDeleteDialog: { type: Boolean },
    employeeToDelete: { type: Object },
  };

  static styles = employeeListStyles;

  constructor() {
    super();
    this.employees = [];
    this.filteredEmployees = [];
    this.searchTerm = '';
    this.currentPage = 1;
    this.showDeleteDialog = false;
    this.employeeToDelete = null;

    const state = store.getState();
    this.employees = state.employees;
    this.viewMode = state.viewMode;
    this.pageSize = this.viewMode === VIEW_MODES.TABLE ? 9 : 4;
    this.filteredEmployees = this.employees;

    this.unsubscribe = store.subscribe((state) => {
      this.employees = state.employees;
      this.viewMode = state.viewMode;
      this._filterEmployees();
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._languageChangeHandler = () => {
      this.requestUpdate();
    };
    window.addEventListener('language-changed', this._languageChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this._languageChangeHandler) {
      window.removeEventListener('language-changed', this._languageChangeHandler);
    }
  }

  _handleSearch(e) {
    this.searchTerm = e.detail.searchTerm;
    this.currentPage = 1;
    this._filterEmployees();
  }

  _filterEmployees() {
    if (!this.searchTerm) {
      this.filteredEmployees = this.employees;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term)
    );
  }

  _toggleViewMode(mode) {
    setViewMode(mode);
    this.pageSize = mode === VIEW_MODES.TABLE ? 9 : 4;
    this.currentPage = 1;
  }

  _getPaginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredEmployees.slice(start, end);
  }

  _getTotalPages() {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  _goToPage(page) {
    this.currentPage = page;
  }

  _handleEdit(employee) {
    Router.go(`/employees/edit/${employee.id}`);
  }

  _handleDelete(employee) {
    this.employeeToDelete = employee;
    this.showDeleteDialog = true;
  }

  _confirmDelete() {
    if (this.employeeToDelete) {
      deleteEmployee(this.employeeToDelete.id);
      this.showDeleteDialog = false;
      this.employeeToDelete = null;

      if (this._getPaginatedEmployees().length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }

  _cancelDelete() {
    this.showDeleteDialog = false;
    this.employeeToDelete = null;
  }

  _renderTableView() {
    const employees = this._getPaginatedEmployees();

    if (employees.length === 0) {
      return this._renderEmptyState();
    }

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <input type="checkbox" />
              </th>
              <th>${t('table.firstName')}</th>
              <th>${t('table.lastName')}</th>
              <th>${t('table.dateOfEmployment')}</th>
              <th>${t('table.dateOfBirth')}</th>
              <th>${t('table.phone')}</th>
              <th>${t('table.email')}</th>
              <th>${t('table.department')}</th>
              <th>${t('table.position')}</th>
              <th>${t('table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${employees.map(emp => html`
              <tr>
                <td class="checkbox-cell">
                  <input type="checkbox" />
                </td>
                <td data-label="${t('table.firstName')}">${emp.firstName}</td>
                <td data-label="${t('table.lastName')}">${emp.lastName}</td>
                <td data-label="${t('table.dateOfEmployment')}">${formatDate(emp.dateOfEmployment)}</td>
                <td data-label="${t('table.dateOfBirth')}">${formatDate(emp.dateOfBirth)}</td>
                <td data-label="${t('table.phone')}">${formatPhone(emp.phone)}</td>
                <td data-label="${t('table.email')}">${emp.email}</td>
                <td data-label="${t('table.department')}">${t(`departments.${emp.department.toLowerCase()}`)}</td>
                <td data-label="${t('table.position')}">${t(`positions.${emp.position.toLowerCase()}`)}</td>
                <td data-label="${t('table.actions')}">
                  <div class="actions">
                    <action-buttons
                      mode="icon-only"
                      .editLabel="${t('actions.edit')}"
                      .deleteLabel="${t('actions.delete')}"
                      @edit-click="${() => this._handleEdit(emp)}"
                      @delete-click="${() => this._handleDelete(emp)}"
                    ></action-buttons>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  _renderListView() {
    const employees = this._getPaginatedEmployees();

    if (employees.length === 0) {
      return this._renderEmptyState();
    }

    return html`
      <div class="list-container">
        ${employees.map(emp => html`
          <div class="list-item">
            <div class="list-item-content">
              <div class="list-item-field">
                <span class="field-label">${t('table.firstName')}:</span>
                <span class="field-value">${emp.firstName}</span>
              </div>
              <div class="list-item-field">
                <span class="field-label">${t('table.lastName')}</span>
                <span class="field-value">${emp.lastName}</span>
              </div>
              <div class="list-item-field">
                <span class="field-label">${t('table.dateOfEmployment')}</span>
                <span class="field-value">${formatDate(emp.dateOfEmployment)}</span>
              </div>
              <div class="list-item-field">
                <span class="field-label">${t('table.dateOfBirth')}</span>
                <span class="field-value">${formatDate(emp.dateOfBirth)}</span>
              </div>
              <div class="list-item-field">
                <span class="field-label">${t('table.phone')}</span>
                <span class="field-value">${formatPhone(emp.phone)}</span>
              </div>
              <div class="list-item-field">
                <span class="field-label">${t('table.email')}</span>
                <span class="field-value">${emp.email}</span>
              </div>
              <div class="list-item-field">
                <span class="field-label">${t('table.department')}</span>
                <span class="field-value">${t(`departments.${emp.department.toLowerCase()}`)}</span>
              </div>
              <div class="list-item-field">
                <span class="field-label">${t('table.position')}</span>
                <span class="field-value">${t(`positions.${emp.position.toLowerCase()}`)}</span>
              </div>
            </div>
            <div class="list-item-actions">
              <action-buttons
                mode="icon-text"
                .editLabel="${t('actions.edit')}"
                .deleteLabel="${t('actions.delete')}"
                @edit-click="${() => this._handleEdit(emp)}"
                @delete-click="${() => this._handleDelete(emp)}"
              ></action-buttons>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  _renderEmptyState() {
    return html`
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <div class="empty-text">
          ${this.searchTerm ? t('employeeList.noResults') : t('employeeList.noEmployees')}
        </div>
      </div>
    `;
  }

  _renderPagination() {
    return html`
      <app-pagination
        .currentPage="${this.currentPage}"
        .totalPages="${this._getTotalPages()}"
        @page-change="${(e) => this._goToPage(e.detail.page)}"
      ></app-pagination>
    `;
  }

  render() {
    return html`
      <page-header
        .title="${t('employeeList.title')}"
        .showViewToggle="${true}"
        .viewMode="${this.viewMode}"
        .showSearch="${true}"
        .searchTerm="${this.searchTerm}"
        @view-mode-change="${(e) => this._toggleViewMode(e.detail.mode)}"
        @search="${this._handleSearch}"
      ></page-header>

      ${this.viewMode === VIEW_MODES.TABLE ? this._renderTableView() : this._renderListView()}

      ${this._renderPagination()}

      <confirm-dialog
        ?open="${this.showDeleteDialog}"
        .title="${t('confirmations.deleteTitle')}"
        .message="${this.employeeToDelete ? t('confirmations.deleteMessage', {
          name: `${this.employeeToDelete.firstName} ${this.employeeToDelete.lastName}`
        }) : ''}"
        @confirm="${this._confirmDelete}"
        @cancel="${this._cancelDelete}"
      ></confirm-dialog>
    `;
  }
}

customElements.define('employee-list-page', EmployeeListPage);
