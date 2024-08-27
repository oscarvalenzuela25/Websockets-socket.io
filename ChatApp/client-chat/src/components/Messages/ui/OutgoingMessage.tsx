import { FC } from 'react';
import { Message } from '../../../types/auth';
import { dateFormat } from '../../../utils/date';

type Props = {
  message: Message;
};

const OutgoingMessage: FC<Props> = ({ message }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message.message}</p>
        <span className="time_date"> {dateFormat(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default OutgoingMessage;
