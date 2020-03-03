import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: 'light',
    refreshing: false,
    registration: null,
    updateExists: false,
  },
  mutations: {
    changeTheme(state, n) {
      if (n === 'dark' || n === 'light') {
        state.theme = n;
      } else {
        state.theme = 'light';
      }
    },
    changeRegistration(state, n) {
      state.registration = n;
    },
    changeUpdateExists(state, n) {
      state.updateExists = n;
    },
    changeRefreshing(state, n) {
      state.refreshing = n;
    },
  },
  actions: {
  },
  modules: {
  },
});
