import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AuthInfo } from '../types/auth';

interface AuthState {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
  token: string | null;

  handleSetToken: (token: string) => void;
  handleSetLoginInfo: (loginInfo: AuthInfo) => void;
}

const authStore: StateCreator<
  AuthState,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = set => ({
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
  token: null,

  handleSetToken: (token: string) => {
    set(prevState => {
      prevState.token = token;
    });
  },
  handleSetLoginInfo: (loginInfo: AuthInfo) => {
    set(prevState => {
      prevState.uid = loginInfo.uid;
      prevState.checking = loginInfo.checking;
      prevState.logged = true;
      prevState.name = loginInfo.name;
      prevState.email = loginInfo.email;
      prevState.token = loginInfo.token;
    });
  },
});

const useAuthStore = create<AuthState>()(
  devtools(persist(immer(authStore), { name: 'Auth-store' }))
);

export default useAuthStore;
