import { checkAuth, checkAdmin } from '../../middlewares';

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
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('../../pages/app/Results.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/timetables',
    name: 'timetables',
    component: () => import('../../pages/app/Timetable.vue'),
    beforeEnter: checkAuth
  }
];

export default DashboardRoutes;
