import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: 'light',
  },
  mutations: {
    changeTheme(state, n) {
      if (n === 'dark' || n === 'light') {
        state.theme = n;
      } else {
        state.theme = 'light';
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
