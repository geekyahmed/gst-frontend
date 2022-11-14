import { checkAuth } from "../../middlewares";

const PostRoutes = [
    {
        path: '/posts',
        name: 'posts',
        component: () => import('../../pages/posts/Posts.vue'),
        beforeEnter: checkAuth
    },
    {
        path: '/posts/:slug/preview',
        name: 'post-preview',
        component: () => import('../../pages/posts/PostPreview.vue'),
        beforeEnter: checkAuth
    },
    {
        path: '/posts/create',
        name: 'create-post',
        component: () => import('../../pages/posts/CreatePost.vue'),
        beforeEnter: checkAuth
    },
    {
        path: '/posts/:slug/edit',
        name: 'edit-post',
        component: () => import('../../pages/posts/EditPost.vue'),
        beforeEnter: checkAuth
    }
]

export default PostRoutes