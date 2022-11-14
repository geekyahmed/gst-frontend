import PostService from '../../services/post.service'

const initialState = {
    status: {
        success: false,
    },
    posts: null,
    user_posts: null,
    own_posts: null,
}

export const post = {
    namespaced: true,
    state: initialState,
    actions: {
        GET_POSTS({ commit }) {
            return PostService.getPosts().then(resp => {
                commit('POSTS_SUCCESS', resp.data.data.data)
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE');
                return Promise.reject(error);
            })
        },

        GET_USER_POSTS({ commit }, id) {
            return PostService.getUserPosts(id).then(resp => {
                commit('USER_POSTS_SUCCESS', resp.data.data)
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE');
                return Promise.reject(error);
            })
        },

        GET_OWN_POSTS({ commit }) {
            return PostService.getOwnPosts().then(resp => {
                commit('OWN_POSTS_SUCCESS', resp.data.data)
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE');
                return Promise.reject(error);
            })
        },

        GET_POST_DETAILS({ commit }, slug) {
            return PostService.getPostDetails(slug).then(resp => {
                commit('SUCCESS')
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE');
                return Promise.reject(error);
            })
        },
        CREATE_POST({ commit }, data) {
            return PostService.createPost(data).then(resp => {
                commit('SUCCESS')
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE')
                return Promise.reject(error)
            })
        },
        UPDATE_POST({ commit }, {slug, data}) {
            return PostService.updatePost(slug, data).then(resp => {
                commit('SUCCESS')
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE')
                return Promise.reject(error)
            })
        },
        DELETE_POST({ commit }, slug) {
            return PostService.deletePost(slug).then(resp => {
                commit('SUCCESS')
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE')
                return Promise.reject(error)
            })
        },
    },
    mutations: {
        POSTS_SUCCESS(state, data) {
            state.status.success = true
            state.projects = data
        },
        USER_POSTS_SUCCESS(state, data) {
            state.status.success = false
            state.user_posts = data
        },
        OWN_POSTS_SUCCESS(state, data){
            state.status.success = false
            state.own_posts = data
        },
        SUCCESS(state) {
            state.status.success = true
        },
        FAILURE(state) {
            state.status.success = false
        }
    },
    getters: {
        posts: state => {
            return state.posts
        },
        user_posts: state => {
            return state.user_posts
        },
        own_posts : state => {
            return state.own_posts
        }
    }
};
