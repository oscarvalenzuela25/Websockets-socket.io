import { useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAuthStore from '../../../store/AuthZustand';
import useChat from '../../../hooks/useChat';

const SearchBox = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const { handleResetChatStore } = useChat();
  const name = useAuthStore(state => state.name);

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <h4>{name}</h4>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button
            className="btn text-danger"
            onClick={() => {
              logout();
              handleResetChatStore();
              history.replace('/auth/login');
            }}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
