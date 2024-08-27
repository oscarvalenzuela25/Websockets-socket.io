import { useContext } from 'react';
import { SocketContext } from '../store/SocketContext';

const useSocketContext = () => {
  const context = useContext(SocketContext);

  return {
    ...context,
  };
};

export default useSocketContext;
