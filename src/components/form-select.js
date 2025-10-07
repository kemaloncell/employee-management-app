/**
 * Form Select Component
 */

import { LitElement, html, css } from 'lit';
import { cssVariables } from '../styles/shared-styles.js';

export class FormSelect extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    error: { type: String },
    required: { type: Boolean },
    placeholder: { type: String },
    options: { type: Array }, // [{ value: 'tech', label: 'Technology' }]
  };

  static styles = [
    cssVariables,
    css`
      .form-field {
        display: flex;
        flex-direction: column;
      }

      .form-label {
        font-weight: var(--font-weight-medium);
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }

      .form-label .required {
        color: var(--color-error);
      }

      .form-select {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-size: 0.9rem;
        font-family: inherit;
        background-color: var(--color-white);
        box-sizing: border-box;
        transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        height: 38px;
        cursor: pointer;
        padding-right: 2.5rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        appearance: none;
      }

      .form-select:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
      }

      .form-select.error {
        border-color: var(--color-error);
      }

      .form-select.error:focus {
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
      }

      .error-message {
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--spacing-xs);
        min-height: 1.25rem;
      }
    `
  ];

  constructor() {
    super();
    this.required = false;
    this.value = '';
    this.error = '';
    this.options = [];
    this.placeholder = '';
  }

  _handleChange(e) {
    this.dispatchEvent(new CustomEvent('select-change', {
      detail: { name: this.name, value: e.target.value },
      bubbles: true,
      composed: true
    }));
  }

  _handleBlur() {
    this.dispatchEvent(new CustomEvent('select-blur', {
      detail: { name: this.name },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="form-field">
        <label class="form-label">
          ${this.label}
          ${this.required ? html`<span class="required">*</span>` : ''}
        </label>
        <select
          class="form-select ${this.error ? 'error' : ''}"
          .value="${this.value}"
          @change="${this._handleChange}"
          @blur="${this._handleBlur}"
          ?required="${this.required}"
        >
          ${this.placeholder ? html`<option value="">${this.placeholder}</option>` : ''}
          ${this.options.map(opt => html`
            <option value="${opt.value}" ?selected="${opt.value === this.value}">
              ${opt.label}
            </option>
          `)}
        </select>
        <div class="error-message">${this.error || ''}</div>
      </div>
    `;
  }
}

customElements.define('form-select', FormSelect);
