import { LitElement, html, css } from 'lit';
import { cssVariables, buttonStyles } from '../styles/shared-styles.js';

export class ConfirmDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    title: { type: String },
    message: { type: String }
  };

  static styles = [
    cssVariables,
    buttonStyles,
    css`
      :host {
        display: none;
      }

      :host([open]) {
        display: block;
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .dialog {
        background: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
        max-width: 400px;
        width: 90%;
        box-shadow: var(--shadow-lg);
      }

      .dialog-title {
        margin: 0 0 var(--spacing-md) 0;
        font-size: var(--font-size-xl);
        color: var(--color-text);
      }

      .dialog-message {
        margin: 0 0 var(--spacing-lg) 0;
        color: var(--color-text-light);
      }

      .dialog-actions {
        display: flex;
        gap: var(--spacing-sm);
        justify-content: flex-end;
      }
    `
  ];

  constructor() {
    super();
    this.open = false;
  }

  _handleConfirm() {
    this.dispatchEvent(new CustomEvent('confirm', {
      bubbles: true,
      composed: true
    }));
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.open) return html``;

    return html`
      <div class="overlay" @click="${this._handleCancel}">
        <div class="dialog" @click="${(e) => e.stopPropagation()}">
          <h2 class="dialog-title">${this.title}</h2>
          <p class="dialog-message">${this.message}</p>

          <div class="dialog-actions">
            <button class="btn btn-secondary" @click="${this._handleCancel}">
              Cancel
            </button>
            <button class="btn btn-danger" @click="${this._handleConfirm}">
              Confirm
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
