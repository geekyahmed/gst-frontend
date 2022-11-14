import Login from '../../pages/auth/Login.vue';
import Register from '../../pages/auth/Register.vue';
import CookieService from '../../services/cookie.service'

const checkAuth = (to, from, next) => {
    const token = CookieService.getToken()
    if (token) {
        next('/');
    }
    else {
        next();
    }
}

const AuthRoutes = [
    {
        path: '/login',
        component: Login,
        beforeEnter: checkAuth
    },
    {
        path: '/register',
        component: Register,
        beforeEnter: checkAuth
    }
]

export default AuthRoutes