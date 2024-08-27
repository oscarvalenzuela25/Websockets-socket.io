import { FC } from 'react';
import Avatar from '../../../../../assets/avatar.png';
import { User } from '../../../../../types/auth';
import useChatStore from '../../../../../store/ChatZustand';
import useChat from '../../../../../hooks/useChat';
import { scrollToBottom } from '../../../../../utils/scroll';

type Props = {
  user: User;
};

const SidebarChatItem: FC<Props> = ({ user }) => {
  const { handleSelectChat, handleFetchMessages } = useChat();
  const activeChat = useChatStore(state => state.activeChat);

  const onClick = async () => {
    handleSelectChat(user.uid, activeChat);
    await handleFetchMessages(user.uid);
    scrollToBottom('messages');
  };

  return (
    <div
      className={`chat_list ${activeChat === user.uid && 'active_chat'}`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img src={Avatar} alt="sunil" />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarChatItem;
