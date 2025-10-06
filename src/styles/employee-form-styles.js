/**
 * Employee Form Styles
 * Styles for the employee add/edit form page including form grid layout and responsive design
 */

import { css } from 'lit';
import { cssVariables, buttonStyles, cardStyles } from './shared-styles.js';

export const employeeFormStyles = [
  cssVariables,
  buttonStyles,
  cardStyles,
  css`
    :host {
      display: block;
    }

    .page-header {
      max-width: 1200px;
      margin: 0 auto var(--spacing-lg);
    }

    .edit-subtitle {
      color: var(--color-text);
      font-size: var(--font-size-base);
      margin: 0 0 var(--spacing-lg) -1rem;
    }

    .form-container {
      max-width: 1200px;
      margin: 0 auto;
      background: var(--color-white);
      padding: 3rem 4rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3.5rem 3.5rem;
      margin-bottom: var(--spacing-xl);
    }

    .form-actions {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      padding-top: var(--spacing-lg);
    }

    .form-actions .btn {
      min-width: 200px;
    }

    @media (max-width: 1024px) {
      .form-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .form-container {
        padding: var(--spacing-lg);
      }

      .edit-subtitle {
        margin-left: 0;
      }

      .form-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
      }

      .form-actions {
        flex-direction: column-reverse;
      }

      .form-actions .btn {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 1.25rem;
      }

      .form-container {
        padding: var(--spacing-md);
      }
    }
  `
];
