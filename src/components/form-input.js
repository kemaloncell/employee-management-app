/**
 * Form Input Component
 */

import { LitElement, html, css } from 'lit';
import { cssVariables } from '../styles/shared-styles.js';

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

      .form-input {
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
      }

      .form-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
      }

      .form-input.error {
        border-color: var(--color-error);
      }

      .form-input.error:focus {
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
      }

      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(46%) sepia(89%) saturate(2881%) hue-rotate(360deg) brightness(102%) contrast(104%);
        cursor: pointer;
      }

      .error-message {
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--spacing-xs);
        min-height: 1.25rem;
      }

      .helper-text {
        font-size: var(--font-size-sm);
        color: var(--color-text-light);
        margin-top: var(--spacing-xs);
      }
    `
  ];

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
