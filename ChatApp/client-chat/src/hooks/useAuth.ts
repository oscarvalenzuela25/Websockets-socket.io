import useAuthStore from '../store/AuthZustand';
import {
  LoginApiResponse,
  RegisterApiResponse,
  RenewApiResponse,
} from '../types/auth';
import { fetchWithoutToken, fetchWithToken } from './../utils/fetch';

const useAuth = () => {
  const token = useAuthStore(state => state.token);
  const handleSetLoginInfo = useAuthStore(state => state.handleSetLoginInfo);

  const login = async (email: string, password: string) => {
    const data: LoginApiResponse = await fetchWithoutToken(
      '/api/login',
      { email, password } as never,
      'POST'
    );
    if (data.token) {
      handleSetLoginInfo({
        uid: data.user.uid,
        checking: false,
        logged: true,
        name: data.user.name,
        email: data.user.email,
        token: data?.token,
      });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string) => {
    const data: RegisterApiResponse = await fetchWithoutToken(
      '/api/login/new',
      { name, email, password } as never,
      'POST'
    );
    if (data.token) {
      handleSetLoginInfo({
        uid: data.user.uid,
        checking: false,
        logged: true,
        name: data.user.name,
        email: data.user.email,
        token: data?.token,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    handleSetLoginInfo({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
      token: null,
    });
  };

  const verifyToken = async () => {
    if (!token) {
      logout();
      return false;
    }

    const data: RenewApiResponse = await fetchWithToken('/api/login/renew');
    if (data.token) {
      handleSetLoginInfo({
        uid: data.user.uid,
        checking: false,
        logged: true,
        name: data.user.name,
        email: data.user.email,
        token: data?.token,
      });
      return true;
    } else {
      logout();
      return false;
    }
  };

  return {
    login,
    register,
    verifyToken,
    logout,
  };
};

export default useAuth;
