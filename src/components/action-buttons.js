import { LitElement, html, css } from 'lit';
import { cssVariables } from '../styles/shared-styles.js';

export class ActionButtons extends LitElement {
  static properties = {
    mode: { type: String }, // 'icon-only' or 'icon-text'
    editLabel: { type: String },
    deleteLabel: { type: String },
  };

  static styles = [
    cssVariables,
    css`
      :host {
        display: flex;
        gap: var(--spacing-sm);
      }

      .action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
        background: none;
        border: none;
        cursor: pointer;
        transition: opacity 0.2s;
        padding: var(--spacing-sm);
      }

      .action-btn:hover {
        opacity: 0.7;
      }

      .action-btn img {
        width: 20px;
        height: 20px;
      }

      /* Icon-text mode (Card view) */
      :host([mode="icon-text"]) {
        flex-direction: row;
        gap: var(--spacing-sm);
      }

      :host([mode="icon-text"]) .action-btn {
        padding: 0.625rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: var(--font-weight-medium);
        flex: 1;
      }

      :host([mode="icon-text"]) .edit-btn {
        background-color: #6c5ce7;
        color: var(--color-white);
      }

      :host([mode="icon-text"]) .delete-btn {
        background-color: var(--color-primary);
        color: var(--color-white);
      }

      :host([mode="icon-text"]) .action-btn img {
        width: 16px;
        height: 16px;
        filter: brightness(0) invert(1);
      }

      /* Icon-only mode (Table view) */
      :host([mode="icon-only"]) .action-btn {
        color: var(--color-primary);
      }
    `
  ];

  constructor() {
    super();
    this.mode = 'icon-only';
    this.editLabel = 'Edit';
    this.deleteLabel = 'Delete';
  }

  _handleEdit() {
    this.dispatchEvent(new CustomEvent('edit-click', {
      bubbles: true,
      composed: true
    }));
  }

  _handleDelete() {
    this.dispatchEvent(new CustomEvent('delete-click', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <button
        class="action-btn edit-btn"
        @click="${this._handleEdit}"
        title="${this.editLabel}"
      >
        <img src="/assets/edit-icon.svg" alt="${this.editLabel}" />
        ${this.mode === 'icon-text' ? this.editLabel : ''}
      </button>
      <button
        class="action-btn delete-btn"
        @click="${this._handleDelete}"
        title="${this.deleteLabel}"
      >
        <img src="/assets/delete-icon.svg" alt="${this.deleteLabel}" />
        ${this.mode === 'icon-text' ? this.deleteLabel : ''}
      </button>
    `;
  }
}

customElements.define('action-buttons', ActionButtons);
