import { LitElement, html } from 'lit';
import { cssVariables } from './styles/shared-styles.js';
import { appStyles } from './styles/app-styles.js';
import { router } from './router/index.js';
import { t, setCurrentLanguage, getCurrentLanguage } from './locales/index.js';

class AppRoot extends LitElement {
  static properties = {
    currentRoute: { type: Object },
    currentLanguage: { type: String }
  };

  static styles = [cssVariables, appStyles];

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
