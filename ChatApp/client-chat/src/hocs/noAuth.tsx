import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuthStore from '../store/AuthZustand';

const noAuth = (Component: () => JSX.Element) => {
  const NoAuth = () => {
    const history = useHistory();
    const token = useAuthStore(state => state.token);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      if (token) {
        history.replace('/');
        setReady(true);
      }
      setReady(true);
    }, []);

    return ready ? <Component /> : 'Cargando...';
  };

  return NoAuth;
};

export default noAuth;
