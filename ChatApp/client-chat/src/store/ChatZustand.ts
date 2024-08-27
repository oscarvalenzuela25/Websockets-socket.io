import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Message, User } from '../types/auth';

interface ChatState {
  uid: string | null;
  activeChat: string | null;
  users: User[];
  messages: Message[];

  handleSetUid: (data: string | null) => void;
  handleSetActiveChat: (activeChat: string | null) => void;
  handleSetUsers: (data: User[]) => void;
  handleSetMessages: (data: Message[]) => void;

  handleAddMessage: (message: Message) => void;
  handleResetChatStore: () => void;
}

const chatStore: StateCreator<
  ChatState,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set, get) => ({
  uid: null,
  activeChat: null,
  users: [],
  messages: [],

  handleSetUid: (data: string | null) => {
    set(prevState => {
      prevState.uid = data;
    });
  },
  handleSetActiveChat: (activeChat: string | null) => {
    set(prevState => {
      prevState.activeChat = activeChat;
    });
  },
  handleSetUsers: (data: User[]) => {
    set(prevState => {
      prevState.users = data;
    });
  },
  handleSetMessages: (data: Message[]) => {
    set(prevState => {
      prevState.messages = data;
    });
  },

  handleAddMessage: (message: Message) => {
    const messagesInStore = get().messages;
    if (!messagesInStore.some(msg => msg._id === message._id)) {
      set(prevState => {
        prevState.messages.push(message);
      });
    }
  },
  handleResetChatStore: () => {
    set(prevState => {
      prevState.uid = null;
      prevState.activeChat = null;
      prevState.users = [];
      prevState.messages = [];
    });
  },
});

const useChatStore = create<ChatState>()(
  devtools(immer(chatStore), { name: 'Chat-store' })
);

export default useChatStore;
