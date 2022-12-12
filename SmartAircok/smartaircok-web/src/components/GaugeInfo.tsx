import React from 'react'

import GaugeInfoBar from './GaugeInfoBar';

import {GauGeInfoProps} from '../items/interfaces';

import './GaugeInfo.css'

const GaugeInfo = ({gaugeparam} : GauGeInfoProps) => {
  return (
    <section className='gauge-info'>
      <span className='gauge-info-header'>
        <span className='gauge-info-header-separator'/>
        <b className='gauge-info-header-title'> Gauge Info </b>
      </span>

      <ul className='gauge-info-data'>
        {Object.entries(gaugeparam).map(([key, value]) => {
          return (
            <li className='gauge-info-data-li' key={key}> 
              <p className='gauge-info-data-li-param'> {key} </p>

              <svg className='gauge-info-data-li-bar'>
                <rect x='0' y='0' width='100%' height='100%' fill='#f2f2f2'/>
                <GaugeInfoBar val={value} />
              </svg>

              <p className='gauge-info-data-li-val'> {value} </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default GaugeInfo;