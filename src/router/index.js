import { routes, matchRoute } from './routes.js';

class Router {
  constructor() {
    this.currentRoute = null;
    this.currentParams = {};
    this.listeners = [];
    this.loadedComponents = new Set();
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="/"]')) {
        e.preventDefault();
        this.navigate(e.target.getAttribute('href'));
      }
    });

    this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname;
    const match = matchRoute(path);

    if (match) {
      const { route, params } = match;

      if (!this.loadedComponents.has(route.component)) {
        await route.load();
        this.loadedComponents.add(route.component);
      }

      this.currentRoute = route;
      this.currentParams = params;
      this.notifyListeners();
    }
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => {
      listener({
        route: this.currentRoute,
        params: this.currentParams
      });
    });
  }

  getCurrentRoute() {
    return {
      route: this.currentRoute,
      params: this.currentParams
    };
  }
}

export const router = new Router();
