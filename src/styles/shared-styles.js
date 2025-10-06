/**
 * Shared Styles
 * Contains CSS variables and reusable utility styles for the application
 */

import { css } from 'lit';

export const cssVariables = css`
  :host {
    --color-primary: #ff6200;
    --color-primary-hover: #e55a00;
    --color-primary-light: #fff5f0;

    --color-text: #333;
    --color-text-light: #666;
    --color-white: #ffffff;
    --color-background: #f5f5f5;
    --color-border: #ddd;
    --color-border-light: #e0e0e0;
    --color-error: #dc3545;

    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    --radius-sm: 4px;
    --radius-md: 8px;

    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 2rem;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;

    --transition-fast: 0.2s;
    --transition-base: 0.3s;

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const buttonStyles = css`
  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .btn-primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .btn-primary:hover {
    background-color: var(--color-primary-hover);
  }

  .btn-primary:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .btn-secondary {
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    color: var(--color-text-light);
  }

  .btn-secondary:hover {
    background-color: var(--color-background);
  }
`;

export const formStyles = css`
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

  .form-input,
  .form-select {
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

  .form-input:focus,
  .form-select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
  }

  .form-input.error,
  .form-select.error {
    border-color: var(--color-error);
  }

  .form-input.error:focus,
  .form-select.error:focus {
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  }

  .form-select {
    cursor: pointer;
    padding-right: 2.5rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    appearance: none;
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
`;

export const cardStyles = css`
  .page-header {
    margin-bottom: var(--spacing-xl);
  }

  .page-title {
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-2xl);
    color: var(--color-primary);
    margin: 0;
  }
`;
