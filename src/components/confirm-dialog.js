/**
 * Confirmation Dialog Component
 */

import { LitElement, html, css } from 'lit';
import { t } from '../locales/index.js';

export class ConfirmDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    title: { type: String },
    message: { type: String },
  };

  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    :host([open]) {
      display: block;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.2s ease-out;
    }

    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      min-width: 400px;
      max-width: 90%;
      padding: 1.5rem;
      animation: slideIn 0.3s ease-out;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .dialog-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ff6200;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #ff6200;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 0.7;
    }

    .dialog-body {
      color: #666;
      line-height: 1.5;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }

    .dialog-footer {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    button {
      padding: 0.625rem 1.5rem;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      font-weight: 500;
      width: 100%;
    }

    .btn-confirm {
      background-color: #ff6200;
      color: white;
      border: none;
    }

    .btn-confirm:hover {
      background-color: #e55a00;
    }

    .btn-cancel {
      background-color: white;
      border: 1px solid #ddd;
      color: #666;
    }

    .btn-cancel:hover {
      background-color: #f5f5f5;
    }

    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translate(-50%, -45%);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .dialog {
        min-width: auto;
        width: 90%;
      }
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.message = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  _handleConfirm() {
    this.dispatchEvent(new CustomEvent('confirm'));
    this.open = false;
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.open = false;
  }

  _handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this._handleCancel();
    }
  }

  render() {
    return html`
      <div class="overlay" @click="${this._handleOverlayClick}">
        <div class="dialog">
          <div class="dialog-header">
            <h2 class="dialog-title">${this.title}</h2>
            <button
              class="close-btn"
              @click="${this._handleCancel}"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div class="dialog-body">
            ${this.message}
          </div>

          <div class="dialog-footer">
            <button class="btn-confirm" @click="${this._handleConfirm}">
              ${t('confirmations.proceed')}
            </button>
            <button class="btn-cancel" @click="${this._handleCancel}">
              ${t('confirmations.cancel')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
