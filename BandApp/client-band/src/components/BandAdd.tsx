import { ChangeEvent, FormEvent, useState } from 'react';
// import useSocketContext from '../hooks/useSocketContext';
import useSocketStore from '../store/SocketZustand';

const BandAdd = () => {
  // const { addBand } = useSocketContext();
  const addBand = useSocketStore(state => state.addBand);
  const [bandName, setBandName] = useState('');

  const onChangeBandName = (e: ChangeEvent<HTMLInputElement>) => {
    setBandName(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBand(bandName);
    setBandName('');
  };

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={bandName}
          onChange={onChangeBandName}
        />
      </form>
    </>
  );
};

export default BandAdd;
