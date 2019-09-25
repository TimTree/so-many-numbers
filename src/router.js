import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NotFoundComponent from './views/NotFoundComponent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias: '/index.html',
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('./views/Game.vue'),
    },
    { path: '*', component: NotFoundComponent },
  ],
});
