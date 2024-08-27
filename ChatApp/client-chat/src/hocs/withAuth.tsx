import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuthStore from '../store/AuthZustand';
import useAuth from '../hooks/useAuth';

const withAuth = (Component: () => JSX.Element) => {
  const WithAuth = () => {
    const history = useHistory();
    const token = useAuthStore(state => state.token);
    const { verifyToken } = useAuth();
    const [ready, setReady] = useState(false);

    const handleVerifyToken = async () => {
      const valid = await verifyToken();
      if (!valid) {
        history.replace('/auth/login');
      }
    };

    useEffect(() => {
      if (token) {
        handleVerifyToken();
        setReady(true);
      } else {
        history.replace('/auth/login');
        setReady(true);
      }
    }, []);

    return ready ? <Component /> : 'Cargando...';
  };

  return WithAuth;
};

export default withAuth;
