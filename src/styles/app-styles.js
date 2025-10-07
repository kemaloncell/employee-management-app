/**
 * App Layout Styles
 * Defines the main application layout including header, navigation, and container structure
 */

import { css } from 'lit';
import { cssVariables } from './shared-styles.js';

export const appStyles = [
  cssVariables,
  css`
  :host {
    display: block;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Header */
  header {
    background-color: var(--color-white);
    box-shadow: var(--shadow-sm);
    width: 100%;
  }

  .header-content {
    max-width: 100%;
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  /* Logo */
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .logo img {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
  }

  /* Navigation */
  .header-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    justify-content: flex-end;
  }

  .nav-link,
  .btn-add {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-primary);
    font-size: 0.875rem;
    font-weight: var(--font-weight-normal);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    transition: opacity var(--transition-fast);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .nav-link {
    text-decoration: none;
  }

  .btn-add {
    background: none;
    border: none;
    cursor: pointer;
  }

  .nav-link.active,
  .btn-add.active {
    opacity: 0.5;
    pointer-events: none;
  }

  .nav-link .icon,
  .btn-add .icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  /* Language Toggle */
  .lang-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.25rem;
    line-height: 1;
    flex-shrink: 0;
  }

  main {
    flex: 1;
    padding: var(--spacing-md) var(--spacing-md);
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header-content {
      padding: 0.5rem;
    }

    .logo img {
      width: 28px;
      height: 28px;
    }

    .logo-text {
      font-size: 1rem;
    }

    .nav-link,
    .btn-add {
      font-size: 0.8rem;
      padding: 0.25rem 0.375rem;
    }

    .header-nav {
      gap: 0.25rem;
    }

    .lang-btn {
      font-size: 1.25rem;
      padding: 0.25rem;
    }

    main {
      padding: var(--spacing-sm);
    }
  }

  @media (max-width: 480px) {
    .logo-text {
      display: none;
    }

    .nav-link span,
    .btn-add span {
      display: none;
    }

    .nav-link .icon,
    .btn-add .icon {
      width: 20px;
      height: 20px;
    }

    .header-nav {
      gap: 0.5rem;
    }
  }
`
];
