import { createContext, FC, PropsWithChildren } from 'react';
import useSocket from '../hooks/useSocket';
import { Socket } from 'socket.io-client';
import { Band } from '../types';

// TypeScript documentation
// https://socket.io/docs/v4/typescript/

// emit
export type EmitEvents = {
  'vote-band': ({ id }: { id: string }) => void;
  'remove-band': ({ id }: { id: string }) => void;
  'change-name-band': ({ id, name }: { id: string; name: string }) => void;
  'add-band': ({ name }: { name: string }) => void;
};

// on
export type OnEvents = {
  'current-bands': (bands: Band[]) => void;
};

type SocketContextType = {
  socket: Socket<OnEvents, EmitEvents>;
  online: boolean;

  voteBand: (bandId: string) => void;
  removeBand: (bandId: string) => void;
  changeNameBand: (bandId: string, bandName: string) => void;
  addBand: (bandName: string) => void;
};

export const SocketContext = createContext({} as SocketContextType);

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const { socket, online } = useSocket();

  const voteBand = (bandId: string) => {
    socket.emit('vote-band', { id: bandId });
  };

  const removeBand = (bandId: string) => {
    socket.emit('remove-band', { id: bandId });
  };

  const changeNameBand = (bandId: string, bandName: string) => {
    socket.emit('change-name-band', { id: bandId, name: bandName });
  };

  const addBand = (bandName: string) => {
    socket.emit('add-band', { name: bandName });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
        voteBand,
        removeBand,
        changeNameBand,
        addBand,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
