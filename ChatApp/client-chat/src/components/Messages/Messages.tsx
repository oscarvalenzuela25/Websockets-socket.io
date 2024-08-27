import useAuthStore from '../../store/AuthZustand';
import useChatStore from '../../store/ChatZustand';
import IncomingMessage from './ui/IncomingMessage';
import OutgoingMessage from './ui/OutgoingMessage';
import SendMessage from './ui/SendMessage';

const Messages = () => {
  const messages = useChatStore(state => state.messages);
  const uid = useAuthStore(state => state.uid);

  return (
    <div className="mesgs">
      <div className="msg_history" id="messages">
        {messages.map(message => {
          if (message.to === uid) {
            return <IncomingMessage key={message._id} message={message} />;
          } else {
            return <OutgoingMessage key={message._id} message={message} />;
          }
        })}
      </div>
      <SendMessage />
    </div>
  );
};

export default Messages;
