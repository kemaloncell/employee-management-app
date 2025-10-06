import { LitElement, html, css } from 'lit';
import { cssVariables } from '../styles/shared-styles.js';

export class AppPagination extends LitElement {
  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
    visibleRange: { type: Number }
  };

  static styles = [
    cssVariables,
    css`
      :host {
        display: block;
      }

      .pagination {
        margin-top: var(--spacing-md);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
      }

      .page-btn {
        min-width: 36px;
        height: 36px;
        border: none;
        background: transparent;
        color: var(--color-text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-base);
        transition: all var(--transition-fast);
      }

      .page-btn:hover:not(:disabled):not(.active) {
        color: var(--color-primary);
      }

      .page-btn.active {
        border-radius: 50%;
        background: var(--color-primary);
        color: white;
        font-weight: var(--font-weight-medium);
      }

      .page-btn:disabled {
        color: var(--color-text-light);
        cursor: not-allowed;
        opacity: 0.5;
      }

      .page-ellipsis {
        min-width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 768px) {
        .hide-mobile {
          display: none;
        }
      }
    `
  ];

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.visibleRange = 2;
  }

  _getVisiblePages() {
    if (this.totalPages <= 1) return [];

    const pages = [];
    const { currentPage, totalPages, visibleRange } = this;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 5 ||
        i > totalPages - 5 ||
        Math.abs(i - currentPage) <= visibleRange
      ) {
        pages.push({ page: i, isFarFromCurrent: Math.abs(i - currentPage) > 2 });
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages;
  }

  _goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { page },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (this.totalPages <= 1) return html``;

    const pages = this._getVisiblePages();

    return html`
      <div class="pagination">
        <button
          class="page-btn"
          @click="${() => this._goToPage(this.currentPage - 1)}"
          ?disabled="${this.currentPage === 1}"
        >
          ‹
        </button>

        ${pages.map(page =>
          page === '...'
            ? html`<span class="page-ellipsis">...</span>`
            : html`
                <button
                  class="page-btn ${page.page === this.currentPage ? 'active' : ''} ${page.isFarFromCurrent ? 'hide-mobile' : ''}"
                  @click="${() => this._goToPage(page.page)}"
                >
                  ${page.page}
                </button>
              `
        )}

        <button
          class="page-btn"
          @click="${() => this._goToPage(this.currentPage + 1)}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          ›
        </button>
      </div>
    `;
  }
}

customElements.define('app-pagination', AppPagination);
