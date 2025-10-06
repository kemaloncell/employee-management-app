import { css } from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    padding: var(--spacing-lg);
    max-width: 800px;
    margin: 0 auto;
  }

  .header {
    margin-bottom: var(--spacing-lg);
  }

  .header h1 {
    margin: 0 0 var(--spacing-sm) 0;
    color: var(--color-text);
  }

  .back-link {
    color: var(--color-primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .form-container {
    background: white;
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .form-grid .full-width {
    grid-column: 1 / -1;
  }

  .form-actions {
    margin-top: var(--spacing-lg);
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
`;
