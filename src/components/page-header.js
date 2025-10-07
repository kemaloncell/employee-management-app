import { LitElement, html, css } from 'lit';
import { cssVariables } from '../styles/shared-styles.js';
import { t } from '../locales/index.js';
import { VIEW_MODES } from '../constants/index.js';

export class PageHeader extends LitElement {
  static properties = {
    title: { type: String },
    showViewToggle: { type: Boolean },
    viewMode: { type: String },
    showSearch: { type: Boolean },
    searchTerm: { type: String },
  };

  static styles = [
    cssVariables,
    css`
      :host {
        display: block;
      }

      .page-header {
        padding: var(--spacing-sm) 0;
        margin-bottom: var(--spacing-md);
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        flex-wrap: wrap;
      }

      .page-title {
        font-size: 1.5rem;
        font-weight: var(--font-weight-medium);
        color: var(--color-primary);
        margin: 0;
        flex: 1;
        min-width: 150px;
      }

      .search-bar {
        flex: 1;
        min-width: 200px;
      }

      .view-toggle {
        display: flex;
        gap: var(--spacing-xs);
        flex: 1;
        justify-content: flex-end;
        min-width: 80px;
      }

      .view-btn {
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
        padding: 0;
      }

      .view-btn img {
        width: 16px;
        height: 16px;
        filter: invert(54%) sepia(89%) saturate(2625%) hue-rotate(360deg) brightness(102%) contrast(104%);
        opacity: 0.4;
        transition: opacity var(--transition-fast);
      }

      .view-btn:hover img {
        opacity: 0.7;
      }

      .view-btn.active img {
        opacity: 1;
      }

      .search-input {
        width: 100%;
        padding: 0.5rem var(--spacing-md);
        border: 1px solid var(--color-border);
        border-radius: 6px;
        font-size: 0.875rem;
        transition: all var(--transition-fast);
        box-sizing: border-box;
      }

      .search-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
      }

      @media (max-width: 768px) {
        .page-header {
          padding: var(--spacing-xs) 0;
        }

        .header-content {
          gap: var(--spacing-md);
        }

        .page-title {
          font-size: 1.25rem;
          flex: 1;
          min-width: unset;
        }

        .search-bar {
          flex: 0 0 100%;
          min-width: unset;
          order: 3;
        }

        .search-input {
          width: 100%;
        }

        .view-toggle {
          flex: 0 0 auto;
          min-width: unset;
          order: 2;
        }
      }
    `
  ];

  constructor() {
    super();
    this.title = '';
    this.showViewToggle = false;
    this.viewMode = VIEW_MODES.TABLE;
    this.showSearch = false;
    this.searchTerm = '';
  }

  _handleViewModeChange(mode) {
    this.dispatchEvent(new CustomEvent('view-mode-change', {
      detail: { mode },
      bubbles: true,
      composed: true
    }));
  }

  _handleSearch(e) {
    this.dispatchEvent(new CustomEvent('search', {
      detail: { searchTerm: e.target.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">${this.title}</h1>

          ${this.showSearch ? html`
            <div class="search-bar">
              <input
                type="text"
                class="search-input"
                placeholder="${t('employeeList.search')}"
                .value="${this.searchTerm}"
                @input="${this._handleSearch}"
              />
            </div>
          ` : ''}

          ${this.showViewToggle ? html`
            <div class="view-toggle">
              <button
                class="view-btn ${this.viewMode === VIEW_MODES.TABLE ? 'active' : ''}"
                @click="${() => this._handleViewModeChange(VIEW_MODES.TABLE)}"
                title="${t('employeeList.tableView')}"
              >
                <img src="/assets/table-icon.svg" alt="Table view" />
              </button>
              <button
                class="view-btn ${this.viewMode === VIEW_MODES.LIST ? 'active' : ''}"
                @click="${() => this._handleViewModeChange(VIEW_MODES.LIST)}"
                title="${t('employeeList.listView')}"
              >
                <img src="/assets/list-icon.svg" alt="List view" />
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('page-header', PageHeader);
