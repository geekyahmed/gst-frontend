import Vue from 'vue';
import Router from 'vue-router';
import AuthRoutes from './routes/auth.routes';
import DashboardRoutes from './routes/dashboard.routes';
import NotFound from '../pages/404.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    ...AuthRoutes,
    ...DashboardRoutes,
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    },
    {
      path: '/404',
      component: NotFound
    }
  ]
});
