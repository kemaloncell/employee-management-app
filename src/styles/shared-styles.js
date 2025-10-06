import { css } from 'lit';

export const cssVariables = css`
  :host {
    --color-primary: #ff6200;
    --color-primary-dark: #e55a00;
    --color-primary-light: #ff8533;

    --color-secondary: #0047bb;

    --color-success: #28a745;
    --color-danger: #dc3545;
    --color-warning: #ffc107;

    --color-white: #ffffff;
    --color-black: #000000;

    --color-background: #f5f5f5;
    --color-background-dark: #e9ecef;

    --color-text: #2c3e50;
    --color-text-light: #6c757d;
    --color-text-lighter: #95a5a6;

    --color-border: #dee2e6;
    --color-border-light: #e9ecef;

    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;

    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;

    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-xxl: 1.5rem;

    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;

    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

    --transition-fast: 150ms ease;
    --transition-normal: 300ms ease;
  }
`;

export const buttonStyles = css`
  .btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background: var(--color-primary);
    color: var(--color-white);
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--color-primary-dark);
  }

  .btn-secondary {
    background: var(--color-background);
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }

  .btn-secondary:hover:not(:disabled) {
    background: var(--color-background-dark);
  }

  .btn-danger {
    background: var(--color-danger);
    color: var(--color-white);
  }

  .btn-danger:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const tableStyles = css`
  table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-white);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  th, td {
    padding: var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--color-border-light);
  }

  th {
    background: var(--color-background);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background: var(--color-background);
  }
`;

export const cardStyles = css`
  .card {
    background: var(--color-white);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-fast);
  }

  .card:hover {
    box-shadow: var(--shadow-md);
  }
`;

export const paginationStyles = css`
  .pagination {
    display: flex;
    gap: var(--spacing-xs);
    justify-content: center;
    margin-top: var(--spacing-lg);
  }

  .page-btn {
    min-width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
  }

  .page-btn:hover:not(:disabled) {
    background: var(--color-background);
  }

  .page-btn.active {
    background: var(--color-primary);
    color: var(--color-white);
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
