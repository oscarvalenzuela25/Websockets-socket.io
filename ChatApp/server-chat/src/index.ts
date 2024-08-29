// Server Model: Contiene todo el servidor de express + socket.io configurado
import dotenv from 'dotenv';
import Server from '../src/models/server';

// Paquete para leer y establecer las variables de entorno
dotenv.config();

// Inicializar la instancia del server
const server = new Server();

// Ejecutar el server
server.execute();
