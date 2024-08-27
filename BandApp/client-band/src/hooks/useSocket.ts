import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  const basePath = import.meta.env.VITE_API_URL || '';
  const [online, setOnline] = useState(false);

  const socket = useMemo(
    () =>
      io(basePath, {
        transports: ['websocket'],
      }),
    [basePath]
  );

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online };
};

export default useSocket;
