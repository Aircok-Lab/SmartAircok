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

import { RadarChartProps } from '../items/Interfaces';
  
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({datas, sensor} : RadarChartProps) => {
  const data = {
    labels: [...datas.map((val) => val.data_reg_dt)],
    datasets: [
      {
        label: '# of Votes',
        data: [...datas.map((val) => new Map(Object.entries(val)).get(sensor))],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className='radar-section' style={{width:'75%', height:'75%'}}>
      <Radar data={data}/>
    </section>
  );
}

export default RadarChart;