import { Router } from '@vaadin/router';
import { routes } from './routes.js';

export function initRouter(outlet) {
  if (!outlet) {
    throw new Error('Router outlet element is required');
  }

  const router = new Router(outlet);
  router.setRoutes(routes);

  return router;
}

export { routes };
