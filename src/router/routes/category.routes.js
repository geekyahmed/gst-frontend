import { checkAuth, checkAdminAccess } from "../../middlewares";

const CategoryRoutes = [
    {
        path: '/categories',
        name: 'categories',
        component: () => import('../../pages/categories/Categories.vue'),
        beforeEnter: (checkAuth, checkAdminAccess)
    },
    {
        path: '/categories/:slug/preview',
        name: 'category-preview',
        component: () => import('../../pages/categories/CategoryPreview.vue'),
        beforeEnter: (checkAuth, checkAdminAccess)
    },
    {
        path: '/categories/create',
        name: 'create-category',
        component: () => import('../../pages/categories/CreateCategory.vue'),
        beforeEnter: (checkAuth, checkAdminAccess)
    },
    {
        path: '/categories/:slug/edit',
        name: 'edit-category',
        component: () => import('../../pages/categories/EditCategory.vue'),
        beforeEnter: (checkAuth, checkAdminAccess)
    }
]

export default CategoryRoutes