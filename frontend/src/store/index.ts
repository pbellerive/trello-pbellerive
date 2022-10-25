import Vue from 'vue';
import Vuex from 'vuex';
import { FeathersVuex } from '@/feathers-client';
import RootState from './interfaces';

// Store Modules

const requireModule = require.context('../features/', true, /\.module.ts$/);
const modules = requireModule.keys()
  .map((path) => ({ [path]: requireModule(path).default }))
  .reduce((acc, mod) => ({ ...acc, ...mod }), {});

// Service Models

const requireModel = require.context('../features/', true, /\.model.ts$/);
const models = requireModel.keys().map((path) => requireModel(path).default);

Vue.use(Vuex);
Vue.use(FeathersVuex);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApiModels { /* Let each service augment this interface */ }
declare module 'feathers-vuex' {
  interface FeathersVuexGlobalModels {
    api: ApiModels,
  }
}

export default new Vuex.Store<RootState>({
  modules: {
    ...modules,
  },
  plugins: [
    ...models,
  ],
});
