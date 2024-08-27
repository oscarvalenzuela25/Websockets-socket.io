import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useAuthStore from '../store/AuthZustand';
import { EmitEvents, OnEvents } from '../types/socket';

const useSocket = () => {
  const basePath = import.meta.env.VITE_API_URL || '';
  const token = useAuthStore(state => state.token);
  const [socket, setSocket] = useState<Socket<OnEvents, EmitEvents> | null>(
    null
  );
  const [online, setOnline] = useState(false);

  // Aqui se conecta al socket automaticamente
  // const socket = useMemo(
  //   () =>
  //     io(basePath, {
  //       transports: ['websocket'],
  //     }),
  //   [basePath]
  // );

  // Conexion manual
  const connectSocket = useCallback(() => {
    const tempSocket = io(basePath, {
      transports: ['websocket'],
      autoConnect: true, // Hace que se conecte automáticamente
      forceNew: true, // Hace que se cree una nueva conexión cada vez que se conecta
      query: {
        'x-token': token, // Se envía el token en la query, en el back se usa socket.handshake.query['x-token']
      },
    });
    setSocket(tempSocket);
  }, [basePath, token]);

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setOnline(true);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        setOnline(false);
      });
    }
  }, [socket]);

  return { socket, online, connectSocket, disconnectSocket };
};

export default useSocket;
