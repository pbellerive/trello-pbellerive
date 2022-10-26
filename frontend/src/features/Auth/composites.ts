import store from '@/store';
import { LoginPayload } from '@/shared/types/auth';
import feathersClient from '@/feathers-client';
import { AnyData } from '@/shared/types/commons';

export default (): {
  isAuthenticated: () => Promise<boolean>,
  login: (payload: LoginPayload) => Promise<void>,
  reAuthenticate: (force?: boolean) => Promise<AnyData>,
  logout: () => Promise<void>,
} => (
  {
    isAuthenticated: async () => {
      const a = await feathersClient.get('authentication');
      return !!a;
    },
    login: (payload) => store.dispatch('auth/authenticate', payload),
    reAuthenticate: async (force) => {
      await feathersClient.reAuthenticate(force);
      return feathersClient.get('authentication');
    },
    logout: () => store.dispatch('auth/logout'),
  }
);
