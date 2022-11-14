import { checkAuth } from '../../middlewares';

const DashboardRoutes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../../pages/app/Dashboard.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../../pages/app/Settings.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../../pages/app/Users.vue'),
    beforeEnter: checkAuth
  }
];

export default DashboardRoutes;
