/**
 * Employee List Styles
 * Styles for the employee list page including table view, card view, search, and pagination
 */

import { css } from 'lit';
import { cssVariables, buttonStyles, cardStyles } from './shared-styles.js';

export const employeeListStyles = [
  cssVariables,
  buttonStyles,
  cardStyles,
  css`
    :host {
      display: block;
    }

    .page-header {
      margin-bottom: var(--spacing-lg);
    }

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
      gap: var(--spacing-sm);
    }

    .page-title {
      margin: 0;
      line-height: 1.2;
    }

    .search-bar {
      margin-bottom: 0;
    }

    .search-input {
      width: 100%;
      max-width: 500px;
      padding: 12px 16px;
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      transition: all var(--transition-fast);
      background: var(--color-white);
    }

    .search-input::placeholder {
      color: var(--color-text-light);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(255, 94, 0, 0.1);
    }

    .view-toggle {
      display: flex;
      gap: 4px;
      background: var(--color-background);
      padding: 4px;
      border-radius: var(--radius-sm);
    }

    .view-btn {
      padding: 8px 12px;
      border: 1px solid transparent;
      background: transparent;
      cursor: pointer;
      font-size: 1rem;
      color: var(--color-text-light);
      transition: all var(--transition-fast);
      border-radius: var(--radius-sm);
      min-width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .view-btn:hover:not(.active) {
      background: var(--color-white);
      border-color: var(--color-border-light);
    }

    .view-btn.active {
      background: var(--color-white);
      color: var(--color-primary);
      border-color: var(--color-primary);
      font-weight: var(--font-weight-medium);
    }

    .table-container {
      background: var(--color-white);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      max-width: 100%;
      padding: 0 0.5rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }

    th {
      padding: 0.5rem 0.5rem;
      text-align: left;
      font-weight: var(--font-weight-medium);
      color: var(--color-primary);
      background-color: var(--color-white);
      border-bottom: 2px solid var(--color-border-light);
      font-size: 0.8rem;
      white-space: nowrap;
    }

    td {
      padding: 0.5rem 0.5rem;
      border-bottom: 1px solid var(--color-border-light);
      font-size: 0.8rem;
      color: var(--color-text-light);
      white-space: nowrap;
    }

    td:nth-child(2),
    td:nth-child(3) {
      font-weight: var(--font-weight-medium);
      color: var(--color-text);
    }

    tr:hover {
      background-color: #fafafa;
    }

    .checkbox-cell {
      width: 50px;
      text-align: center;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .actions {
      display: flex;
      gap: var(--spacing-sm);
    }

    .action-btn img {
      width: 20px;
      height: 20px;
    }

    .list-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-md);
      max-width: 1200px;
      margin: 0 auto;
    }

    .list-item {
      background: var(--color-white);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--color-border-light);
    }

    .list-item-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
    }

    .list-item-field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .field-label {
      font-size: 0.75rem;
      color: var(--color-text-light);
      font-weight: var(--font-weight-normal);
    }

    .field-value {
      color: var(--color-text);
      font-size: 0.875rem;
      font-weight: var(--font-weight-medium);
    }

    .list-item-actions {
      display: flex;
      align-items: flex-start;
    }

    .pagination {
      margin-top: var(--spacing-sm);
      padding: 0;
      background: transparent;
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
      color: var(--color-white);
      font-weight: var(--font-weight-medium);
    }

    .page-btn:disabled {
      color: var(--color-text-light);
      cursor: not-allowed;
      opacity: 0.5;
    }

    .page-info {
      margin: 0 var(--spacing-sm);
      color: var(--color-text);
      font-size: var(--font-size-sm);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--color-white);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: var(--spacing-md);
    }

    .empty-text {
      font-size: var(--font-size-lg);
      color: var(--color-text-light);
    }

    @media (max-width: 1024px) {
      .table-container {
        overflow-x: auto;
      }

      table {
        min-width: 900px;
        font-size: 0.85rem;
      }

      th, td {
        padding: 0.75rem 0.5rem;
      }
    }

    @media (max-width: 768px) {
      .title-row {
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-sm);
      }

      .page-title {
        font-size: var(--font-size-xl);
        flex: 1;
      }

      .view-toggle {
        flex-shrink: 0;
      }

      .search-bar {
        margin-bottom: var(--spacing-sm);
      }

      .search-input {
        max-width: 100%;
        font-size: 16px;
      }

      .table-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      table {
        min-width: 900px;
        font-size: 0.85rem;
      }

      th, td {
        padding: 0.75rem 0.5rem;
        font-size: 0.85rem;
      }

      .list-container {
        grid-template-columns: 1fr;
      }

      .list-item-content {
        grid-template-columns: 1fr;
      }

      .pagination {
        flex-wrap: wrap;
        gap: var(--spacing-xs);
      }

      .page-btn {
        padding: var(--spacing-sm);
        min-width: 35px;
        font-size: var(--font-size-sm);
      }

      .page-info {
        margin: 0 var(--spacing-sm);
        font-size: var(--font-size-sm);
        width: 100%;
        text-align: center;
        order: -1;
        margin-bottom: var(--spacing-xs);
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 1.25rem;
      }

      .view-btn {
        font-size: 1rem;
        min-width: 36px;
        height: 32px;
        padding: var(--spacing-xs) var(--spacing-sm);
      }

      .view-toggle {
        padding: 4px;
      }

      th, td {
        padding: 0.5rem 0.25rem;
        font-size: 0.8rem;
      }
    }
  `
];
