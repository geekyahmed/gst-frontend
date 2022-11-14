import CookieService from '../services/cookie.service';
import store from '../store/index';

export const checkAuth = (to, from, next) => {
  const token = CookieService.getToken();

  if (!token) {
    next('/login');
  } else {
    next();
  }
};

export const checkAdminAccess = (to, from, next) => {
  const user = store.getters['user/user'];

  if (user.role != 'admin') {
    next('/404');
  } else {
    next();
  }
};
