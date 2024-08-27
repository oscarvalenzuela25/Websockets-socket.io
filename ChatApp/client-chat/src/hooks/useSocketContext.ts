import { useContext } from 'react';
import { SocketContext } from '../store/SocketContext';

const useSocketContext = () => {
  const socketContext = useContext(SocketContext);

  return socketContext;
};

export default useSocketContext;
