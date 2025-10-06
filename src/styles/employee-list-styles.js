import { css } from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    padding: var(--spacing-lg);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }

  .header h1 {
    margin: 0;
    color: var(--color-text);
  }

  .controls {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }

  .search-box {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-base);
    min-width: 250px;
  }

  .search-box:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 94, 0, 0.1);
  }

  .view-toggle {
    display: flex;
    gap: var(--spacing-xs);
  }

  .view-btn {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border);
    background: white;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .view-btn.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--color-text-light);
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      align-items: stretch;
    }

    .controls {
      flex-direction: column;
    }

    .search-box {
      width: 100%;
    }
  }
`;
