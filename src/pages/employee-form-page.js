import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { store } from '../store/store.js';
import { addEmployee, updateEmployee, getEmployeeById } from '../store/actions.js';
import { validateEmployeeForm, formatPhoneNumber } from '../utils/validators.js';
import { t } from '../locales/index.js';
import { getDepartmentOptions, getPositionOptions, PHONE_CONFIG } from '../constants/index.js';
import '../components/confirm-dialog.js';
import '../components/form-input.js';
import '../components/form-select.js';
import { employeeFormStyles } from '../styles/employee-form-styles.js';

export class EmployeeFormPage extends LitElement {
  static properties = {
    employeeId: { type: Number },
    isEditMode: { type: Boolean },
    formData: { type: Object },
    errors: { type: Object },
    showUpdateDialog: { type: Boolean },
  };

  static styles = employeeFormStyles;

  constructor() {
    super();
    this.employeeId = null;
    this.isEditMode = false;
    this.errors = {};
    this.showUpdateDialog = false;
    this.formData = this._getEmptyFormData();
  }

  connectedCallback() {
    super.connectedCallback();

    this._languageChangedHandler = () => {
      if (Object.keys(this.errors).length > 0) {
        const state = store.getState();
        this.errors = validateEmployeeForm(
          this.formData,
          state.employees,
          this.employeeId
        );
      }
      this.requestUpdate();
    };

    window.addEventListener('language-changed', this._languageChangedHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._languageChangedHandler) {
      window.removeEventListener('language-changed', this._languageChangedHandler);
    }
  }

  onBeforeEnter(location, commands) {
    const id = location.params.id;
    if (id) {
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId) || parsedId < 1) {
        return commands.redirect('/employees');
      }

      this.employeeId = parsedId;
      this.isEditMode = true;

      const employee = getEmployeeById(this.employeeId);
      if (!employee) {
        return commands.redirect('/employees');
      }

      this.formData = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        dateOfEmployment: employee.dateOfEmployment,
        dateOfBirth: employee.dateOfBirth,
        phone: employee.phone,
        email: employee.email,
        department: employee.department,
        position: employee.position,
      };
    } else {
      this.isEditMode = false;
      this.formData = this._getEmptyFormData();
    }
  }

  _getEmptyFormData() {
    return {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
  }


  _handleInputChange(e) {
    const { name, value } = e.detail;
    this._handleInput(name, value);
  }

  _handleSelectChange(e) {
    const { name, value } = e.detail;
    this._handleInput(name, value);
  }

  _handleInput(field, value) {
    if (field === 'phone') {
      const formatted = formatPhoneNumber(value);
      this.formData = { ...this.formData, [field]: formatted };
    } else {
      this.formData = { ...this.formData, [field]: value };
    }

    this._validateField(field);
  }

  _handleInputBlur(e) {
    const { name } = e.detail;
    this._handleBlur(name);
  }

  _handleSelectBlur(e) {
    const { name } = e.detail;
    this._validateField(name);
  }

  _handleBlur(field) {
    if (field === 'phone' && this.formData.phone) {
      this.formData = {
        ...this.formData,
        phone: formatPhoneNumber(this.formData.phone)
      };
    }
    this._validateField(field);
  }

  _validateField(field) {
    const state = store.getState();
    const allErrors = validateEmployeeForm(
      this.formData,
      state.employees,
      this.employeeId
    );

    if (allErrors[field]) {
      this.errors = { ...this.errors, [field]: allErrors[field] };
    } else {
      const { [field]: _, ...rest } = this.errors;
      this.errors = rest;
    }
  }

  _handleSubmit(e) {
    e.preventDefault();

    const state = store.getState();
    const validationErrors = validateEmployeeForm(
      this.formData,
      state.employees,
      this.employeeId
    );

    this.errors = validationErrors;

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (this.isEditMode) {
      this.showUpdateDialog = true;
    } else {
      this._saveEmployee();
    }
  }

  _confirmUpdate() {
    this.showUpdateDialog = false;
    this._saveEmployee();
  }

  _cancelUpdate() {
    this.showUpdateDialog = false;
  }

  _saveEmployee() {
    if (this.isEditMode) {
      updateEmployee(this.employeeId, this.formData);
    } else {
      addEmployee(this.formData);
    }

    Router.go('/employees');
  }

  _handleCancel() {
    Router.go('/employees');
  }

  _isFormValid() {
    return (
      this.formData.firstName &&
      this.formData.lastName &&
      this.formData.email &&
      this.formData.phone &&
      this.formData.dateOfBirth &&
      this.formData.dateOfEmployment &&
      this.formData.department &&
      this.formData.position &&
      Object.keys(this.errors).length === 0
    );
  }

  render() {
    return html`
      <div class="page-header">
        <h1 class="page-title">
          ${this.isEditMode ? t('form.editTitle') : t('form.addTitle')}
        </h1>
      </div>

      <div class="form-container">
        ${this.isEditMode && this.formData.firstName ? html`
          <p class="edit-subtitle">${t('form.editingEmployee')} <strong>${this.formData.firstName} ${this.formData.lastName}</strong></p>
        ` : ''}

        <form @submit="${this._handleSubmit}">
          <div class="form-grid">
            <!-- First Name -->
            <form-input
              label="${t('form.firstName')}"
              name="firstName"
              .value="${this.formData.firstName}"
              .error="${this.errors.firstName}"
              ?required="${true}"
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleInputBlur}"
            ></form-input>

            <!-- Last Name -->
            <form-input
              label="${t('form.lastName')}"
              name="lastName"
              .value="${this.formData.lastName}"
              .error="${this.errors.lastName}"
              ?required="${true}"
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleInputBlur}"
            ></form-input>

            <!-- Date of Employment -->
            <form-input
              label="${t('form.dateOfEmployment')}"
              type="date"
              name="dateOfEmployment"
              .value="${this.formData.dateOfEmployment}"
              .error="${this.errors.dateOfEmployment}"
              ?required="${true}"
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleInputBlur}"
            ></form-input>

            <!-- Date of Birth -->
            <form-input
              label="${t('form.dateOfBirth')}"
              type="date"
              name="dateOfBirth"
              .value="${this.formData.dateOfBirth}"
              .error="${this.errors.dateOfBirth}"
              ?required="${true}"
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleInputBlur}"
            ></form-input>

            <!-- Phone -->
            <form-input
              label="${t('form.phone')}"
              type="tel"
              name="phone"
              .value="${this.formData.phone}"
              .error="${this.errors.phone}"
              placeholder="${PHONE_CONFIG.placeholder}"
              .maxlength="${13}"
              helperText="Format: ${PHONE_CONFIG.placeholder}"
              ?required="${true}"
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleInputBlur}"
            ></form-input>

            <!-- Email -->
            <form-input
              label="${t('form.email')}"
              type="email"
              name="email"
              .value="${this.formData.email}"
              .error="${this.errors.email}"
              ?required="${true}"
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleInputBlur}"
            ></form-input>

            <!-- Department -->
            <form-select
              label="${t('form.department')}"
              name="department"
              .value="${this.formData.department}"
              .error="${this.errors.department}"
              .options="${getDepartmentOptions(t)}"
              placeholder="${t('form.selectDepartment')}"
              ?required="${true}"
              @select-change="${this._handleSelectChange}"
              @select-blur="${this._handleSelectBlur}"
            ></form-select>

            <!-- Position -->
            <form-select
              label="${t('form.position')}"
              name="position"
              .value="${this.formData.position}"
              .error="${this.errors.position}"
              .options="${getPositionOptions(t)}"
              placeholder="${t('form.selectPosition')}"
              ?required="${true}"
              @select-change="${this._handleSelectChange}"
              @select-blur="${this._handleSelectBlur}"
            ></form-select>
          </div>

          <div class="form-actions">
            <button
              type="button"
              class="btn btn-secondary"
              @click="${this._handleCancel}"
            >
              ${t('form.cancel')}
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              ?disabled="${!this._isFormValid()}"
            >
              ${t('form.submit')}
            </button>
          </div>
        </form>
      </div>

      <!-- Update Confirmation Dialog -->
      <confirm-dialog
        ?open="${this.showUpdateDialog}"
        .title="${t('confirmations.updateTitle')}"
        .message="${t('confirmations.updateMessage')}"
        @confirm="${this._confirmUpdate}"
        @cancel="${this._cancelUpdate}"
      ></confirm-dialog>
    `;
  }
}

customElements.define('employee-form-page', EmployeeFormPage);
