import { LitElement, html, css } from 'lit';
import { cssVariables, buttonStyles } from './styles/shared-styles.js';
import { store } from './store/store.js';
import { router } from './router/index.js';
import { t, setCurrentLanguage, getCurrentLanguage } from './locales/index.js';

class AppRoot extends LitElement {
  static properties = {
    currentRoute: { type: Object },
    currentLanguage: { type: String }
  };

  static styles = [
    cssVariables,
    buttonStyles,
    css`
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
    `
  ];

  constructor() {
    super();
    this.currentRoute = null;
    this.currentLanguage = getCurrentLanguage();
    this.unsubscribeRouter = null;
  }

  connectedCallback() {
    super.connectedCallback();

    router.init();

    this.unsubscribeRouter = router.subscribe(({ route }) => {
      this.currentRoute = route;
    });

    const { route } = router.getCurrentRoute();
    this.currentRoute = route;

    window.addEventListener('language-changed', (e) => {
      this.currentLanguage = e.detail.lang;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribeRouter) {
      this.unsubscribeRouter();
    }
    window.removeEventListener('language-changed', () => {});
  }

  _handleLanguageToggle(lang) {
    setCurrentLanguage(lang);
  }

  render() {
    return html`
      <div class="navbar">
        <a href="/" class="navbar-brand" @click="${(e) => {e.preventDefault(); router.navigate('/');}}">
          <h1>🏢 ${t('app.title')}</h1>
        </a>
        <div class="navbar-actions">
          <button
            class="lang-toggle ${this.currentLanguage === 'en' ? 'active' : ''}"
            @click="${() => this._handleLanguageToggle('en')}"
          >
            EN
          </button>
          <button
            class="lang-toggle ${this.currentLanguage === 'tr' ? 'active' : ''}"
            @click="${() => this._handleLanguageToggle('tr')}"
          >
            TR
          </button>
        </div>
      </div>

      <div class="main-content">
        ${this.currentRoute ? html`<${this.currentRoute.component}></${this.currentRoute.component}>` : ''}
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  const appRoot = document.createElement('app-root');
  appContainer.appendChild(appRoot);
});
