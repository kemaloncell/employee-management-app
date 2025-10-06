export const routes = [
  {
    path: '/',
    component: 'employee-list',
    name: 'list',
    load: () => import('../pages/employee-list.js')
  },
  {
    path: '/add',
    component: 'employee-form',
    name: 'add',
    load: () => import('../pages/employee-form.js')
  },
  {
    path: '/edit/:id',
    component: 'employee-form',
    name: 'edit',
    load: () => import('../pages/employee-form.js')
  }
];

export function matchRoute(path) {
  for (const route of routes) {
    const pattern = route.path.replace(/:[^/]+/g, '([^/]+)');
    const regex = new RegExp(`^${pattern}$`);
    const match = path.match(regex);

    if (match) {
      const params = {};
      const paramNames = route.path.match(/:[^/]+/g) || [];

      paramNames.forEach((param, index) => {
        params[param.slice(1)] = match[index + 1];
      });

      return { route, params };
    }
  }

  return null;
}
