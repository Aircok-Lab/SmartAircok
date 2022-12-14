import React from 'react'

import Bar from '../Bar';

import { dataseq } from '../../items/ItemSequences';
import { getDataStyle } from '../../items/Functions';

import { GauGeInfoProps } from '../../items/Interfaces';

import './GaugeInfo.css'

const GaugeInfo = ({dvcDatas} : GauGeInfoProps) => {
  return (
    <section className='gauge-info'>
      <span className='gauge-info-header'>
        <span className='gauge-info-header-separator'/>
        <b className='gauge-info-header-title'> Gauge Info </b>
      </span>

      <ul className='gauge-info-data'>
        {dataseq.map((seqkey) => {
            const mykey = Object.keys(dvcDatas)
            if(mykey.includes(seqkey)){
              const myval = Object.values(dvcDatas)[mykey.indexOf(seqkey)]
  
              const mystyle = getDataStyle(seqkey, myval)

              return (
                <li className='gauge-info-data-li' key={seqkey}> 
                  <p className='gauge-info-data-li-param'> {seqkey} </p>
    
                  <Bar val={Number(myval)} color={mystyle.color}/>
    
                  <p className='gauge-info-data-li-val'> {myval} </p>
                </li>)
            }
            return <></>
        })}
      </ul>
    </section>
  );
}

export default GaugeInfo;