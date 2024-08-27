import { createContext, FC, PropsWithChildren, useEffect } from 'react';
import useSocket from '../hooks/useSocket';
import { Socket } from 'socket.io-client';
import useAuthStore from './AuthZustand';
import { EmitEvents, OnEvents } from '../types/socket';
import { User } from '../types/auth';
import useChatStore from './ChatZustand';
import useChat from '../hooks/useChat';
import { scrollToBottomAnimated } from '../utils/scroll';

type SocketContextType = {
  socket: Socket<OnEvents, EmitEvents> | null;
  online: boolean;
};

export const SocketContext = createContext({} as SocketContextType);

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket();
  const { handleAddMessageToStore } = useChat();
  const token = useAuthStore(state => state.token);
  const handleSetUsers = useChatStore(state => state.handleSetUsers);

  useEffect(() => {
    if (token) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [token]);

  useEffect(() => {
    if (socket) {
      socket.on('list-users', (data: User[]) => {
        handleSetUsers(data);
      });
    }
  }, [socket, handleSetUsers]);

  useEffect(() => {
    if (socket) {
      socket.on('personal-message', data => {
        handleAddMessageToStore(data);
        scrollToBottomAnimated('messages');
      });
    }
  }, [socket, handleAddMessageToStore]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
