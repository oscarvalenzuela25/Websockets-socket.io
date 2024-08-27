const express = require('express');
const server = require('http');
const socket = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.server = server.createServer(this.app);
    this.io = socket(this.server, {
      /* Configuraciones */
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors());
  }

  socketConfig() {
    new Sockets(this.io).socketEvents();
  }

  execute() {
    this.middlewares();
    this.socketConfig();
    this.server.listen(this.port, () => {
      console.log('Server andando en puerto ', this.port);
    });
  }
}

module.exports = Server;
