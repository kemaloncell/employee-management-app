/**
 * Form Input Component
 */

import { LitElement, html } from 'lit';
import { formStyles, cssVariables } from '../styles/shared-styles.js';

export class FormInput extends LitElement {
  static properties = {
    label: { type: String },
    type: { type: String },
    name: { type: String },
    value: { type: String },
    error: { type: String },
    required: { type: Boolean },
    placeholder: { type: String },
    helperText: { type: String },
    maxlength: { type: Number },
  };

  static styles = [cssVariables, formStyles];

  constructor() {
    super();
    this.type = 'text';
    this.required = false;
    this.value = '';
    this.error = '';
    this.placeholder = '';
    this.helperText = '';
  }

  _handleInput(e) {
    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { name: this.name, value: e.target.value },
      bubbles: true,
      composed: true
    }));
  }

  _handleBlur() {
    this.dispatchEvent(new CustomEvent('input-blur', {
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
        <input
          type="${this.type}"
          class="form-input ${this.error ? 'error' : ''}"
          .value="${this.value}"
          @input="${this._handleInput}"
          @blur="${this._handleBlur}"
          ?required="${this.required}"
          placeholder="${this.placeholder}"
          maxlength="${this.maxlength || ''}"
        />
        ${this.helperText ? html`<div class="helper-text">${this.helperText}</div>` : ''}
        <div class="error-message">${this.error || ''}</div>
      </div>
    `;
  }
}

customElements.define('form-input', FormInput);
