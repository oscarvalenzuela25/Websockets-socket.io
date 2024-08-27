import useSocketContext from './useSocketContext';
import useChatStore from './../store/ChatZustand';
import { useState, ChangeEvent, FormEvent } from 'react';
import useAuthStore from '../store/AuthZustand';
import { Message } from '../types/auth';
import { fetchWithToken } from '../utils/fetch';

const useChat = () => {
  const { socket } = useSocketContext();
  const [localMessage, setLocalMessage] = useState('');
  const uid = useAuthStore(state => state.uid);
  const activeChat = useChatStore(state => state.activeChat);
  const handleSetActiveChat = useChatStore(state => state.handleSetActiveChat);
  const handleSetMessages = useChatStore(state => state.handleSetMessages);
  const handleAddMessage = useChatStore(state => state.handleAddMessage);
  const handleResetChatStore = useChatStore(
    state => state.handleResetChatStore
  );

  const onChangeLocalMessage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setLocalMessage(target.value);
  };

  const onSubmitLocalMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localMessage.trim().length === 0) return;
    socket?.emit('personal-message', {
      from: uid || '',
      to: activeChat || '',
      message: localMessage,
    });
    setLocalMessage('');
  };

  const handleSelectChat = (userUid: string, activeChatUid: string | null) => {
    handleSetActiveChat(userUid);
    if (userUid !== activeChatUid) handleSetMessages([]);
  };

  const handleFetchMessages = async (selectedUserUid: string) => {
    const messages: Message[] = await fetchWithToken(
      `/api/messages/${selectedUserUid}`
    );
    handleSetMessages(messages);
  };

  const handleAddMessageToStore = (message: Message) => {
    if (message.to === activeChat || message.from === activeChat) {
      handleAddMessage(message);
    }
  };

  return {
    localMessage,
    onChangeLocalMessage,
    onSubmitLocalMessage,
    handleSelectChat,
    handleFetchMessages,
    handleAddMessageToStore,
    handleResetChatStore,
  };
};

export default useChat;
