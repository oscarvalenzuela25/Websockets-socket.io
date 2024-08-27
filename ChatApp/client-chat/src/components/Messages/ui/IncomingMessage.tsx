import { FC } from 'react';
import Avatar from '../../../assets/avatar.png';
import { Message } from '../../../types/auth';
import { dateFormat } from '../../../utils/date';

type Props = {
  message: Message;
};

const IncomingMessage: FC<Props> = ({ message }) => {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src={Avatar} alt="sunil" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{message.message}</p>
          <span className="time_date"> {dateFormat(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default IncomingMessage;
