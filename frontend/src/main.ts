import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import App from './App.vue';

Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
