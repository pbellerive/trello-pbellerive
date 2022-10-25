import { ServiceState } from 'feathers-vuex';
import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '@/feathers-client';
import { UserInterface } from '@/shared/types/users';
import hooks from './service.hooks';

const modelName = 'User';
const servicePath = 'user';

export class User extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = modelName;

  static instanceDefaults(): UserInterface {
    return {
      _id: null,
      email: null,
      password: null,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User {}

declare module 'feathers-vuex' {
  interface FeathersVuexStoreState {
    [servicePath]: ServiceState<User>
  }
}

declare module 'src/store' {
  interface ApiModels {
    [modelName]: typeof User
  }
}

const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks(hooks);
export default servicePlugin;
