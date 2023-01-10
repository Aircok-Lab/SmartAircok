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
import { Radar } from 'react-chartjs-2';

import { RadarProps } from '../items/Interfaces';

import './RadarGraph.css'
  
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarGraph = ({gaugelabels, gaugedatas} : RadarProps) => {
  const data = {
    labels: gaugelabels,
    datasets: [
      {
        label: '# of Votes',
        data: gaugedatas,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className='radar-section'>
      <Radar data={data}/>
    </section>
  );
}

export default RadarGraph;