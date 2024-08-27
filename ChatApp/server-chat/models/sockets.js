const {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessages,
} = require('../controllers/sockets');
const { verifyJWT } = require('../utils/jwt');

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', async socket => {
      const [valid, uid] = verifyJWT(socket.handshake.query['x-token']);

      if (!valid) {
        console.log('Socket no identificado');
        return socket.disconnect();
      } else {
        console.log('Cliente conectado', new Date().toLocaleString());
        await userConnected(uid);
      }

      // Unimos el usuario a una sala
      socket.join(uid);
      // Emitimos un mensaje a todos los de la sala
      // this.io.to(uid).emit('personal-message', 'Bienvenido!');

      // Escuchar evento: mensaje-personal
      socket.on('personal-message', async data => {
        const message = await saveMessages(data);
        this.io.to(data.from).emit('personal-message', message);
        this.io.to(data.to).emit('personal-message', message);
      });

      this.io.emit('list-users', await getUsers());

      socket.on('disconnect', async () => {
        await userDisconnected(uid);
        this.io.emit('list-users', await getUsers());
        console.log('Cliente desconectado', new Date().toLocaleString());
      });
    });
  }
}

module.exports = Sockets;
