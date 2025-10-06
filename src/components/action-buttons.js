import { LitElement, html, css } from 'lit';
import { cssVariables } from '../styles/shared-styles.js';

export class ActionButtons extends LitElement {
  static properties = {
    mode: { type: String, reflect: true },
    editLabel: { type: String },
    deleteLabel: { type: String }
  };

  static styles = [
    cssVariables,
    css`
      :host {
        display: flex;
        gap: var(--spacing-sm);
      }

      :host([mode="icon-text"]) {
        flex-direction: row;
        gap: var(--spacing-sm);
      }

      .action-btn {
        padding: var(--spacing-xs) var(--spacing-sm);
        border: 1px solid var(--color-border);
        background: white;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: all var(--transition-fast);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-size: var(--font-size-sm);
      }

      .action-btn:hover {
        background: var(--color-background);
      }

      .action-btn.edit:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
      }

      .action-btn.delete:hover {
        border-color: var(--color-danger);
        color: var(--color-danger);
      }

      :host([mode="icon-text"]) .action-btn {
        flex: 1;
        justify-content: center;
      }

      img {
        width: 16px;
        height: 16px;
      }
    `
  ];

  constructor() {
    super();
    this.mode = 'icon';
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
    const showText = this.mode === 'icon-text';

    return html`
      <button class="action-btn edit" @click="${this._handleEdit}">
        ✏️
        ${showText ? html`<span>${this.editLabel}</span>` : ''}
      </button>

      <button class="action-btn delete" @click="${this._handleDelete}">
        🗑️
        ${showText ? html`<span>${this.deleteLabel}</span>` : ''}
      </button>
    `;
  }
}

customElements.define('action-buttons', ActionButtons);
