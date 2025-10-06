import { LitElement, html, css } from 'lit';
import { cssVariables } from '../styles/shared-styles.js';

export class FormInput extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    type: { type: String },
    value: { type: String },
    placeholder: { type: String },
    error: { type: String },
    required: { type: Boolean },
    maxlength: { type: Number },
    helperText: { type: String }
  };

  static styles = [
    cssVariables,
    css`
      :host {
        display: block;
        margin-bottom: var(--spacing-md);
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
      }

      label {
        font-weight: var(--font-weight-medium);
        color: var(--color-text);
        font-size: var(--font-size-sm);
      }

      .required {
        color: var(--color-danger);
      }

      input {
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-base);
        transition: all var(--transition-fast);
      }

      input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(255, 94, 0, 0.1);
      }

      input.error {
        border-color: var(--color-danger);
      }

      .error-message {
        color: var(--color-danger);
        font-size: var(--font-size-sm);
      }

      .helper-text {
        color: var(--color-text-light);
        font-size: var(--font-size-sm);
      }
    `
  ];

  constructor() {
    super();
    this.type = 'text';
    this.value = '';
    this.required = false;
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { name: this.name, value: this.value },
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
      <div class="form-group">
        ${this.label ? html`
          <label>
            ${this.label}
            ${this.required ? html`<span class="required">*</span>` : ''}
          </label>
        ` : ''}

        <input
          type="${this.type}"
          name="${this.name}"
          .value="${this.value}"
          placeholder="${this.placeholder || ''}"
          ?required="${this.required}"
          maxlength="${this.maxlength || ''}"
          class="${this.error ? 'error' : ''}"
          @input="${this._handleInput}"
          @blur="${this._handleBlur}"
        />

        ${this.error ? html`
          <span class="error-message">${this.error}</span>
        ` : ''}

        ${this.helperText && !this.error ? html`
          <span class="helper-text">${this.helperText}</span>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('form-input', FormInput);
