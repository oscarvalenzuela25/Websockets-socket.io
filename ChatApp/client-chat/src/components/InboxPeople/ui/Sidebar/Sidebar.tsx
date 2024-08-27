import useAuthStore from '../../../../store/AuthZustand';
import useChatStore from '../../../../store/ChatZustand';
import SidebarChatItem from './ui/SidebarChatItem';

const Sidebar = () => {
  const users = useChatStore(state => state.users);
  const uid = useAuthStore(state => state.uid);

  return (
    <div className="inbox_chat">
      {users
        .filter(user => user.uid !== uid)
        .map(user => (
          <SidebarChatItem key={user.uid} user={user} />
        ))}

      <div className="extra_space"></div>
    </div>
  );
};

export default Sidebar;
