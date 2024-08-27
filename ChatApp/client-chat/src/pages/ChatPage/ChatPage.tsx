import ChatSelect from '../../components/ChatSelect';
import InboxPeople from '../../components/InboxPeople';
import Messages from '../../components/Messages';
import useChatStore from '../../store/ChatZustand';
import './styles.css';

const ChatPage = () => {
  const activeChat = useChatStore(state => state.activeChat);

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />
        {activeChat ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  );
};

export default ChatPage;
