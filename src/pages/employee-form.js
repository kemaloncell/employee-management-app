import { LitElement, html } from 'lit';
import { cssVariables, buttonStyles } from '../styles/shared-styles.js';
import { employeeFormStyles } from '../styles/employee-form-styles.js';
import { store } from '../store/store.js';
import { addEmployee, updateEmployee, getEmployeeById } from '../store/actions.js';
import { router } from '../router/index.js';
import { t } from '../locales/index.js';
import { getDepartmentOptions, getPositionOptions } from '../constants/index.js';
import { validateEmployeeForm, formatPhoneNumber } from '../utils/validators.js';
import '../components/form-input.js';
import '../components/form-select.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employeeId: { type: Number },
    formData: { type: Object },
    errors: { type: Object },
    touched: { type: Object },
    isEditMode: { type: Boolean }
  };

  static styles = [
    cssVariables,
    buttonStyles,
    employeeFormStyles
  ];

  constructor() {
    super();
    this.employeeId = null;
    this.isEditMode = false;
    this.formData = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      dateOfEmployment: '',
      phone: '',
      email: '',
      department: '',
      position: ''
    };
    this.errors = {};
    this.touched = {};
    this.unsubscribeRouter = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribeRouter = router.subscribe(({ params }) => {
      if (params.id) {
        this.employeeId = parseInt(params.id);
        this.isEditMode = true;
        this._loadEmployee();
      }
    });

    const { params } = router.getCurrentRoute();
    if (params.id) {
      this.employeeId = parseInt(params.id);
      this.isEditMode = true;
      this._loadEmployee();
    }

    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribeRouter) {
      this.unsubscribeRouter();
    }
    window.removeEventListener('language-changed', () => this.requestUpdate());
  }

  _loadEmployee() {
    const employee = getEmployeeById(this.employeeId);
    if (employee) {
      this.formData = { ...employee };
    } else {
      router.navigate('/');
    }
  }

  _handleInputChange(e) {
    const { name, value } = e.detail;

    if (name === 'phone') {
      this.formData = {
        ...this.formData,
        [name]: formatPhoneNumber(value)
      };
    } else {
      this.formData = {
        ...this.formData,
        [name]: value
      };
    }

    if (this.touched[name]) {
      this._validateField(name);
    }
  }

  _handleSelectChange(e) {
    const { name, value } = e.detail;
    this.formData = {
      ...this.formData,
      [name]: value
    };

    if (this.touched[name]) {
      this._validateField(name);
    }
  }

  _handleBlur(e) {
    const { name } = e.detail;
    this.touched = {
      ...this.touched,
      [name]: true
    };
    this._validateField(name);
  }

  _validateField(fieldName) {
    const state = store.getState();
    const fieldErrors = validateEmployeeForm(
      this.formData,
      state.employees,
      this.isEditMode ? this.employeeId : null
    );

    this.errors = {
      ...this.errors,
      [fieldName]: fieldErrors[fieldName]
    };
  }

  _validateForm() {
    const state = store.getState();
    const formErrors = validateEmployeeForm(
      this.formData,
      state.employees,
      this.isEditMode ? this.employeeId : null
    );

    this.errors = formErrors;

    Object.keys(this.formData).forEach(key => {
      this.touched[key] = true;
    });

    return Object.keys(formErrors).length === 0;
  }

  _handleSubmit(e) {
    e.preventDefault();

    if (!this._validateForm()) {
      this.requestUpdate();
      return;
    }

    if (this.isEditMode) {
      updateEmployee(this.employeeId, this.formData);
    } else {
      addEmployee(this.formData);
    }

    router.navigate('/');
  }

  _handleCancel() {
    router.navigate('/');
  }

  render() {
    const departmentOptions = getDepartmentOptions();
    const positionOptions = getPositionOptions();

    return html`
      <div class="header">
        <a href="/" class="back-link" @click="${(e) => {e.preventDefault(); this._handleCancel();}}">
          ← ${t('form.backToList')}
        </a>
        <h1>${this.isEditMode ? t('form.editEmployee') : t('form.addEmployee')}</h1>
      </div>

      <div class="form-container">
        <form @submit="${this._handleSubmit}">
          <div class="form-grid">
            <form-input
              label="${t('form.firstName')}"
              name="firstName"
              .value="${this.formData.firstName}"
              .error="${this.touched.firstName ? this.errors.firstName : ''}"
              required
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleBlur}"
            ></form-input>

            <form-input
              label="${t('form.lastName')}"
              name="lastName"
              .value="${this.formData.lastName}"
              .error="${this.touched.lastName ? this.errors.lastName : ''}"
              required
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleBlur}"
            ></form-input>

            <form-input
              label="${t('form.dateOfBirth')}"
              name="dateOfBirth"
              type="date"
              .value="${this.formData.dateOfBirth}"
              .error="${this.touched.dateOfBirth ? this.errors.dateOfBirth : ''}"
              required
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleBlur}"
            ></form-input>

            <form-input
              label="${t('form.dateOfEmployment')}"
              name="dateOfEmployment"
              type="date"
              .value="${this.formData.dateOfEmployment}"
              .error="${this.touched.dateOfEmployment ? this.errors.dateOfEmployment : ''}"
              required
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleBlur}"
            ></form-input>

            <form-input
              class="full-width"
              label="${t('form.phone')}"
              name="phone"
              type="tel"
              .value="${this.formData.phone}"
              .error="${this.touched.phone ? this.errors.phone : ''}"
              .helperText="${t('form.phoneHelper')}"
              required
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleBlur}"
            ></form-input>

            <form-input
              class="full-width"
              label="${t('form.email')}"
              name="email"
              type="email"
              .value="${this.formData.email}"
              .error="${this.touched.email ? this.errors.email : ''}"
              required
              @input-change="${this._handleInputChange}"
              @input-blur="${this._handleBlur}"
            ></form-input>

            <form-select
              label="${t('form.department')}"
              name="department"
              .value="${this.formData.department}"
              .options="${departmentOptions}"
              .error="${this.touched.department ? this.errors.department : ''}"
              .placeholder="${t('form.selectDepartment')}"
              required
              @select-change="${this._handleSelectChange}"
              @select-blur="${this._handleBlur}"
            ></form-select>

            <form-select
              label="${t('form.position')}"
              name="position"
              .value="${this.formData.position}"
              .options="${positionOptions}"
              .error="${this.touched.position ? this.errors.position : ''}"
              .placeholder="${t('form.selectPosition')}"
              required
              @select-change="${this._handleSelectChange}"
              @select-blur="${this._handleBlur}"
            ></form-select>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="${this._handleCancel}">
              ${t('form.cancel')}
            </button>
            <button type="submit" class="btn btn-primary">
              ${this.isEditMode ? t('form.update') : t('form.save')}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
