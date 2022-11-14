/* eslint-disable no-unused-vars */
import AuthService from '../../services/auth.service';

const getDefaultState = () => {
  return {
    token: null,
    status: {
      success: false,
      loggedIn: false
    },
    user: null
  };
};

const initialState = {
  token: null,
  status: {
    success: false,
    loggedIn: false
  }
};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    LOGIN({ commit }, user) {
      return AuthService.login(user).then(
        response => {
          console.log(response.data);
          commit('LOGIN_SUCCESS', response.data.token.token);

          return Promise.resolve(response.data);
        },
        error => {
          commit('LOGIN_FAILURE');
          return Promise.reject(error);
        }
      );
    },
    LOGOUT({ commit }) {
      AuthService.logout();
      Object.assign(getDefaultState());
      commit('LOGOUT');
    },
    REGISTER({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('REGISTER_SUCCESS');
          return Promise.resolve(response.data);
        },
        error => {
          commit('REGISTER_FAILURE');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    SUCCESS(state) {
      state.status.success = true;
    },
    FAILURE(state) {
      state.status.success = false;
    },
    LOGIN_SUCCESS(state, token) {
      state.status.loggedIn = true;
      state.token = token;
    },
    LOGIN_FAILURE(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    LOGOUT(state) {
      state.status.loggedIn = false;
      state.token = null;
    },
    REGISTER_SUCCESS(state) {
      state.status.loggedIn = false;
    },
    REGISTER_FAILURE(state) {
      state.status.loggedIn = false;
    }
  },
  getters: {
    loggedIn: state => !!state.token
  }
};
