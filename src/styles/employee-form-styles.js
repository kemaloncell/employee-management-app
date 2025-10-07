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

    .edit-subtitle {
      color: var(--color-text);
      font-size: var(--font-size-base);
      margin: 0 0 var(--spacing-lg) 0;
    }

    .form-container {
      background: var(--color-white);
      padding: 2rem 3rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem 2rem;
      margin-bottom: var(--spacing-lg);
    }

    .form-actions {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      padding-top: var(--spacing-md);
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
      .form-container {
        padding: var(--spacing-md);
      }
    }
  `
];
