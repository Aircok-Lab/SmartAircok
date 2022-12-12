import React from 'react'

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';

import {GauGeInfoProps} from '../items/interfaces';

import './Graph.css'
  
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Graph = ({gaugeparam} : GauGeInfoProps) => {
  const data = {
    labels: ['Param1', 'Param2', 'Param3', 'Param4', 'Param5'],
    datasets: [
    {
      label: '# of Votes',
      data: Object.values(gaugeparam),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    ],
  };

  return (
    <section className='graph-section'>
      <Radar data={data}/>
    </section>
  );
}

export default Graph;