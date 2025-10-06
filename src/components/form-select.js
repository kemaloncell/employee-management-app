/**
 * Form Select Component
 */

import { LitElement, html } from 'lit';
import { formStyles, cssVariables } from '../styles/shared-styles.js';

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

  static styles = [cssVariables, formStyles];

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
