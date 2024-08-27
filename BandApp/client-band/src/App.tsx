import BandAdd from './components/BandAdd';
import BandList from './components/BandList';
// import { SocketProvider } from './context/SocketContext';
import BandStatus from './components/BandStatus';
import BandChart from './components/BandChart';

function App() {
  return (
    // <SocketProvider>
    <div className="container">
      <BandStatus />

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
    // </SocketProvider>
  );
}

export default App;
