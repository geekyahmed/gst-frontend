import { checkAuth, checkAdminAccess } from '../../middlewares';

const UserRoutes = [
  {
    path: '/users',
    name: 'users',
    component: () => import('../../pages/users/Users.vue'),
    beforeEnter: (checkAuth, checkAdminAccess)
  }
];

export default UserRoutes;
