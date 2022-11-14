import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

const initialState = {
  status: {
    success: false
  },
  user: null
};

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
    GET_USER({ commit }) {
      return AuthService.getProfile().then(
        resp => {
          commit('SUCCESS', resp.data.data);
          return Promise.resolve(resp.data.data);
        },
        error => {
          commit('FAILURE');
          return Promise.reject(error);
        }
      );
    },
    UPDATE_PROFILE({ commit }, { id, data }) {
      return UserService.updateProfile(id, data).then(
        response => {
          commit('SUCCESS', response.data.data);
          return Promise.resolve(response.data.data);
        },
        error => {
          commit('FAILURE');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    SUCCESS(state, data) {
      state.status.success = true;
      state.user = data;
    },
    FAILURE(state) {
      state.status.success = false;
      state.user = null;
    }
  },
  getters: {
    user: state => {
      return state.user;
    }
  }
};
