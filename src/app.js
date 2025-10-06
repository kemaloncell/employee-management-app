import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { setLanguage } from './store/actions.js';
import { getCurrentLanguage, setCurrentLanguage, t } from './locales/index.js';
import './utils/seed-data.js';
import { appStyles } from './styles/app-styles.js';
import { initRouter } from './router/index.js';

class AppRoot extends LitElement {
  static properties = {
    currentLang: { type: String },
    currentPath: { type: String },
  };

  static styles = appStyles;

  constructor() {
    super();
    this.currentLang = getCurrentLanguage();
    this.currentPath = window.location.pathname;
  }

  connectedCallback() {
    super.connectedCallback();

    this._languageChangeHandler = (e) => {
      this.currentLang = e.detail.lang;
      setLanguage(e.detail.lang);
    };
    window.addEventListener('language-changed', this._languageChangeHandler);

    this._routeChangeHandler = () => {
      this.currentPath = window.location.pathname;
    };
    window.addEventListener('vaadin-router-location-changed', this._routeChangeHandler);
  }

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    this.router = initRouter(outlet);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._languageChangeHandler) {
      window.removeEventListener('language-changed', this._languageChangeHandler);
    }
    if (this._routeChangeHandler) {
      window.removeEventListener('vaadin-router-location-changed', this._routeChangeHandler);
    }

    if (this.router) {
      this.router.setRoutes([]);
    }
  }

  _changeLanguage() {
    const newLang = this.currentLang === 'en' ? 'tr' : 'en';
    setCurrentLanguage(newLang);
    this.currentLang = newLang;
  }

  _navigate(path) {
    Router.go(path);
  }

  render() {
    const isEmployeesPage = this.currentPath === '/employees' || this.currentPath === '/';
    const isAddPage = this.currentPath.includes('/add') || this.currentPath.includes('/edit');

    return html`
      <div class="app-container">
        <header>
          <div class="header-content">
            <div class="logo">
              <img src="/public/logo.svg" alt="ING Logo" width="40" height="40" />
              <div class="logo-text">ING</div>
            </div>
            <div class="header-nav">
              <a
                href="/employees"
                class="nav-link ${isEmployeesPage ? 'active' : ''}"
                @click="${(e) => {
                  e.preventDefault();
                  if (!isEmployeesPage) this._navigate('/employees');
                }}"
              >
                <img src="/public/users-icon.svg" alt="${t('nav.employees')}" class="icon" />
                <span>${t('nav.employees')}</span>
              </a>

              <button
                class="btn-add ${isAddPage ? 'active' : ''}"
                @click="${() => {
                  if (!isAddPage) this._navigate('/employees/add');
                }}"
              >
                <img src="/public/plus-icon.svg" alt="${t('nav.addNew')}" class="icon" />
                <span>${t('nav.addNew')}</span>
              </button>
            </div>

            <div class="header-right">
              <button
                class="lang-btn"
                @click="${this._changeLanguage}"
                title="${this.currentLang === 'en' ? 'Switch to Turkish' : 'İngilizce\'ye geç'}"
              >
                ${this.currentLang === 'en' ? '🇹🇷' : '🇬🇧'}
              </button>
            </div>
          </div>
        </header>

        <main id="outlet"></main>
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);
