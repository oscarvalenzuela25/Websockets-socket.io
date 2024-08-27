import { useEffect } from 'react';
import useSocketStore from '../store/SocketZustand';
// import useSocketContext from '../hooks/useSocketContext';

const BandStatus = () => {
  // const { online } = useSocketContext();
  const online = useSocketStore(state => state.online);
  const socket = useSocketStore(state => state.socket);
  const changeOnlineStatus = useSocketStore(state => state.changeOnlineStatus);

  useEffect(() => {
    socket.on('connect', () => {
      changeOnlineStatus(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      changeOnlineStatus(false);
    });
  }, [socket]);

  return (
    <div className="alert">
      <p>
        Service status:
        {online ? (
          <span className="text-success"> Online</span>
        ) : (
          <span className="text-danger"> Offline</span>
        )}
      </p>
    </div>
  );
};

export default BandStatus;
