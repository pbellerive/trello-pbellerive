// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/home',
    component: lazyLoad('features/Home/views/Main.vue'),
  },
]);
