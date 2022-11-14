/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './modules/auth.module';
import { user } from './modules/user.module';
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'state', 
  storage: window.localStorage, 
  filter: mutation => (true)
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    auth,
    user,
  }
});
