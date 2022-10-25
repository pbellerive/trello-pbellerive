import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import { iff, discard } from 'feathers-hooks-common';
import feathersVuex from 'feathers-vuex';
import { getEnv } from '@/utils/variables';

const API_URL = getEnv('VUE_APP_API_URL');

if (process.env.NODE_ENV === 'production' && !API_URL) {
  throw Error('VUE_APP_API_URL is not set');
}

const host = API_URL || 'http://localhost:3030/';

const socket = io(host, {
  transports: ['websocket'],
});

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .hooks({
    before: {
      all: [
        iff(
          (context) => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp')
        )
      ],
    },
    error: {},
  });

export default feathersClient;

// Setting up feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  FeathersVuex,
} = feathersVuex(
  feathersClient,
  {
    serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
    idField: 'id', // Must match the id field in your database table/collection
    whitelist: ['$regex', '$options'],
  },
);

export {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  FeathersVuex,
};
