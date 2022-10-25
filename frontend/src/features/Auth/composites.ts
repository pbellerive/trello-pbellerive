import store from '@/store';
import { LoginPayload } from '@/shared/types/auth';

export default (): {
  login: (payload: LoginPayload) => Promise<void>,
  logout: () => Promise<void>,
} => (
  {
    login: (payload) => store.dispatch('auth/authenticate', payload),
    logout: () => store.dispatch('auth/logout'),
  }
);
