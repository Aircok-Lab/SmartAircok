import React from 'react'

import GaugeBar from './GaugeBar';

import { dataseq } from '../items/ItemSequences';

import { GauGeInfoProps } from '../items/Interfaces';

import './GaugeInfo.css'

const GaugeInfo = ({gaugemap} : GauGeInfoProps) => {
  return (
    <section className='gauge-info'>
      <span className='gauge-info-header'>
        <span className='gauge-info-header-separator'/>
        <b className='gauge-info-header-title'> Gauge Info </b>
      </span>

      <ul className='gauge-info-data'>
        {dataseq.map((seqkey) => {
            const myinfo : string[] = []

            gaugemap.forEach((paramval, paramkey) => {
              if(seqkey === paramkey){
                myinfo.push(paramkey)
                myinfo.push(paramval)
              }
            })
            
            return myinfo.length === 0 ? <></> : (
              <li className='gauge-info-data-li' key={myinfo[0]}> 
                <p className='gauge-info-data-li-param'> {myinfo[0]} </p>
  
                <GaugeBar val={Number(myinfo[1])} color='#f2f2f2'/>
  
                <p className='gauge-info-data-li-val'> {myinfo[1]} </p>
              </li>
            )
        })}
      </ul>
    </section>
  );
}

export default GaugeInfo;