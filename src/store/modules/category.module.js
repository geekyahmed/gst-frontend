import CategoryService from '../../services/category.service'

const initialState = {
    status: {
        success: false,
    },
    categories: null
}

export const category = {
    namespaced: true,
    state: initialState,
    actions: {
        GET_CATEGORIES({ commit }) {
            return CategoryService.getCategories().then(resp => {
                commit('CATEGORIES_SUCCESS', resp.data.data.data)
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE');
                return Promise.reject(error);
            })
        },
        GET_CATEGORY_DETAILS({ commit }, slug) {
            return CategoryService.getCategoryDetails(slug).then(resp => {
                commit('SUCCESS')
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE');
                return Promise.reject(error);
            })
        },
        CREATE_CATEGORY({ commit }, data) {
            return CategoryService.createCategory(data).then(resp => {
                commit('SUCCESS')
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE')
                return Promise.reject(error)
            })
        },
        UPDATE_CATEGORY({ commit }, {slug, data}) {
            return CategoryService.updateCategory(slug, data).then(resp => {
                commit('SUCCESS')
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE')
                return Promise.reject(error)
            })
        },
        DELETE_POST({ commit }, slug) {
            return CategoryService.deletePost(slug).then(resp => {
                commit('SUCCESS')
                return Promise.resolve(resp.data)
            }, error => {
                commit('FAILURE')
                return Promise.reject(error)
            })
        },
    },
    mutations: {
        CATEGORIES_SUCCESS(state, data) {
            state.status.success = true
            state.categories = data
        },
        SUCCESS(state) {
            state.status.success = true
        },
        FAILURE(state) {
            state.status.success = false
        }
    },
    getters: {
        categories: state => {
            return state.categories
        }
    }
};
