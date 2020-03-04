import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: 'light',
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
    changeUpdateExists(state, n) {
      state.updateExists = n;
    },
  },
  actions: {
  },
  modules: {
  },
});
