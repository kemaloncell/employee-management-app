import { LitElement, html, css } from 'lit';
import { cssVariables } from '../styles/shared-styles.js';

export class FormSelect extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    options: { type: Array },
    placeholder: { type: String },
    error: { type: String },
    required: { type: Boolean }
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

      select {
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-base);
        background: white;
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      select:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(255, 94, 0, 0.1);
      }

      select.error {
        border-color: var(--color-danger);
      }

      .error-message {
        color: var(--color-danger);
        font-size: var(--font-size-sm);
      }
    `
  ];

  constructor() {
    super();
    this.value = '';
    this.options = [];
    this.required = false;
  }

  _handleChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('select-change', {
      detail: { name: this.name, value: this.value },
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
      <div class="form-group">
        ${this.label ? html`
          <label>
            ${this.label}
            ${this.required ? html`<span class="required">*</span>` : ''}
          </label>
        ` : ''}

        <select
          name="${this.name}"
          .value="${this.value}"
          ?required="${this.required}"
          class="${this.error ? 'error' : ''}"
          @change="${this._handleChange}"
          @blur="${this._handleBlur}"
        >
          ${this.placeholder ? html`
            <option value="" disabled selected>${this.placeholder}</option>
          ` : ''}

          ${this.options.map(opt => html`
            <option value="${opt.value}" ?selected="${opt.value === this.value}">
              ${opt.label}
            </option>
          `)}
        </select>

        ${this.error ? html`
          <span class="error-message">${this.error}</span>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('form-select', FormSelect);
