import BandList from './bandList';
import { Server } from 'socket.io';

class Sockets {
  private io: Server;
  private bandList: BandList;

  constructor(io: Server) {
    this.io = io;
    this.bandList = new BandList();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', socket => {
      const message = `Cliente conectado: ${new Date().toLocaleString()}`;
      console.log(message);

      // Emitir bandas activas
      socket.emit('current-bands', this.bandList.getBands());

      // Votar por la banda
      socket.on('vote-band', data => {
        this.bandList.increaseVote(data.id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Emitir remover banda
      socket.on('remove-band', data => {
        this.bandList.removeBand(data.id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Emitir agregar banda
      socket.on('add-band', data => {
        this.io.emit('current-bands', this.bandList.addBand(data.name));
      });

      // Emitir cambiar nombre de banda
      socket.on('change-name-band', data => {
        this.bandList.changeBandName(data.id, data.name);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // practice chat global
      // socket.on('chat', message => {
      //   this.io.emit('chat', message);
      // });
    });
  }
}

export default Sockets;
