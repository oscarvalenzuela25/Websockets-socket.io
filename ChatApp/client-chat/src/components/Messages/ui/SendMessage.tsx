import useChat from '../../../hooks/useChat';

const SendMessage = () => {
  const { localMessage, onChangeLocalMessage, onSubmitLocalMessage } =
    useChat();

  return (
    <form onSubmit={onSubmitLocalMessage}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={localMessage}
            onChange={onChangeLocalMessage}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
