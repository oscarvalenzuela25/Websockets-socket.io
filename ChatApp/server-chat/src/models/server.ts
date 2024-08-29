import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import path from 'path';
import { dbConnection } from '../database/config';
import cors from 'cors';
import authRoutes from '../routes/auth';
import messageRoutes from '../routes/messages';

import Sockets from './sockets';

class Server {
  private app;
  private port;
  private server;
  private io;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Connect to MONGO
    dbConnection();

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = new SocketServer(this.server, {});
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, '../../public')));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/api/login', authRoutes);
    this.app.use('/api/messages', messageRoutes);
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }
}

export default Server;
