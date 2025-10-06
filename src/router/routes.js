export const routes = [
  {
    path: '/',
    redirect: '/employees',
  },
  {
    path: '/employees',
    component: 'employee-list-page',
    action: async () => {
      await import('../pages/employee-list-page.js');
    },
  },
  {
    path: '/employees/add',
    component: 'employee-form-page',
    action: async () => {
      await import('../pages/employee-form-page.js');
    },
  },
  {
    path: '/employees/edit/:id',
    component: 'employee-form-page',
    action: async () => {
      await import('../pages/employee-form-page.js');
    },
  },
  {
    path: '(.*)',
    redirect: '/employees',
  },
];
