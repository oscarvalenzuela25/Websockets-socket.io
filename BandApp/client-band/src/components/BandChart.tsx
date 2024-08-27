import Chart from 'chart.js/auto';
import { useEffect } from 'react';
// import useSocketContext from '../hooks/useSocketContext';
import { Band } from '../types';
import useSocketStore from '../store/SocketZustand';

const BandChart = () => {
  // const { socket } = useSocketContext();
  const socket = useSocketStore(state => state.socket);
  let myChart: Chart;

  const generateChart = (data: Band[]) => {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (myChart) {
      myChart.clear();
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(band => band.name),
        datasets: [
          {
            label: 'Bands by name',
            data: data.map(band => band.votes),
          },
        ],
      },
    });
  };

  useEffect(() => {
    socket.on('current-bands', (bands: Band[] = []) => {
      generateChart(bands);
    });
  }, [socket]);

  return <canvas id="myChart"></canvas>;
};

export default BandChart;
