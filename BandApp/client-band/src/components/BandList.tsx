import { useEffect, useState, ChangeEvent } from 'react';
import { Band } from '../types';
// import useSocketContext from '../hooks/useSocketContext';
import useSocketStore from '../store/SocketZustand';

const BandList = () => {
  // const { socket, voteBand, removeBand, changeNameBand } = useSocketContext();
  const socket = useSocketStore(state => state.socket);
  const voteBand = useSocketStore(state => state.voteBand);
  const removeBand = useSocketStore(state => state.removeBand);
  const changeNameBand = useSocketStore(state => state.changeNameBand);
  const [bandsState, setBandState] = useState<Band[]>([]);

  useEffect(() => {
    socket.on('current-bands', (bands: Band[]) => {
      setBandState(bands);
    });
  }, [socket]);

  const changeName = (event: ChangeEvent<HTMLInputElement>, bandId: string) => {
    const newName = event.target.value;
    setBandState(bandsState =>
      bandsState.map(band => {
        if (band.id === bandId) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onOutBlur = (id: string, name: string) => {
    changeNameBand(id, name);
  };

  const createRows = (band: Band) => {
    return (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => voteBand(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={e => changeName(e, band.id)}
            onBlur={() => onOutBlur(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => removeBand(band.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <h3>Bandas actuales</h3>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{bandsState.map(band => createRows(band))}</tbody>
      </table>
    </>
  );
};

export default BandList;
