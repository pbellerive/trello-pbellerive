import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const requireRoute = require.context('../features/', true, /\.routes.ts$/);
const allRoutes = requireRoute.keys().map((path) => requireRoute(path).default);

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
  ...allRoutes.reduce((acc, route) => [...acc, ...route(lazyLoad)], []),
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
