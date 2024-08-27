import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { io, Socket } from 'socket.io-client';
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
  connect: () => void;
  disconnect: () => void;
};

interface SocketState {
  socket: Socket<OnEvents, EmitEvents>;
  online: boolean;

  voteBand: (bandId: string) => void;
  removeBand: (bandId: string) => void;
  changeNameBand: (bandId: string, bandName: string) => void;
  addBand: (bandName: string) => void;
  changeOnlineStatus: (status: boolean) => void;
}

const socketStore: StateCreator<
  SocketState,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set, get) => {
  const basePath = import.meta.env.VITE_API_URL || '';
  const socketInstance = io(basePath, {
    transports: ['websocket'],
  });

  return {
    socket: socketInstance,
    online: false,

    voteBand: (bandId: string) => {
      const { socket } = get();
      socket.emit('vote-band', { id: bandId });
    },
    removeBand: (bandId: string) => {
      const { socket } = get();
      socket.emit('remove-band', { id: bandId });
    },

    changeNameBand: (bandId: string, bandName: string) => {
      const { socket } = get();
      socket.emit('change-name-band', { id: bandId, name: bandName });
    },

    addBand: (bandName: string) => {
      const { socket } = get();
      socket.emit('add-band', { name: bandName });
    },

    changeOnlineStatus: (status: boolean) => {
      set(prevState => {
        prevState.online = status;
      });
    },
  };
};

const useSocketStore = create<SocketState>()(
  devtools(immer(socketStore), { name: 'Socket-store' })
);

export default useSocketStore;
