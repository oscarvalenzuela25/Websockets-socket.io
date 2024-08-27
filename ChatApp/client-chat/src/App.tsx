import Router from './router/Router';
import SocketProvider from './store/SocketContext';

const App = () => {
  return (
    <SocketProvider>
      <Router />
    </SocketProvider>
  );
};

export default App;
