import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from './home';
import Auth from './auth';

Vue.use(VueRouter);

function lazyLoad(view) {
  return () => import(/* webpackChunkName: "[request]" */ `@/${view}`);
}

export const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: () => '/home',
  },
  ...Home(lazyLoad),
  ...Auth(lazyLoad),
  {
    path: '/unauthenticated',
    name: 'Unauthenticated',
    component: lazyLoad('features/Error/views/Unauthenticated.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: lazyLoad('features/Error/views/NotFound.vue'),
  },
] as RouteConfig[];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  // validate URL
  const link = router.resolve(to.path);
  if (link.resolved?.matched.length === 0) {
    next('/404');
    return;
  }
  next();
});

export default router;
