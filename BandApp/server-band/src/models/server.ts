import express from 'express';
import server from 'http';
import path from 'path';
import Sockets from './sockets';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';

class Server {
  private app;
  private port;
  private server;
  private io;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.server = server.createServer(this.app);
    this.io = new SocketServer(this.server, {});
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../../public')));
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

export default Server;
