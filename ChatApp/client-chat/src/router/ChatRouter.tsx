import { Route, Switch } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import withAuth from '../hocs/withAuth';

const ChatRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={withAuth(ChatPage)} />
    </Switch>
  );
};

export default ChatRouter;
