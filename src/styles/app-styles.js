import { css } from 'lit';

export const appStyles = css`
  :host {
    display: block;
    min-height: 100vh;
    background: var(--color-background);
  }

  .navbar {
    background: white;
    border-bottom: 2px solid var(--color-primary);
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow-sm);
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--color-text);
    text-decoration: none;
  }

  .navbar-brand h1 {
    margin: 0;
    font-size: var(--font-size-xl);
    color: var(--color-primary);
  }

  .navbar-actions {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
  }

  .lang-toggle {
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--color-border);
    background: white;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: var(--font-size-sm);
  }

  .lang-toggle:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  .lang-toggle.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  .main-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .navbar-actions {
      width: 100%;
      justify-content: center;
    }
  }
`;
