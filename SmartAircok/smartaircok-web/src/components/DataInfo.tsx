import React from 'react'

import { DataInfoProps } from '@/items/Interfaces';

import './DataInfo.css'

const DataInfo = ({dvcDatetimes, datetimeidx, setdatetimeidx} : DataInfoProps) => {
  const selectTime = dvcDatetimes[datetimeidx]
  return (
    <div className='datainfo'>
      {new Date(selectTime).toLocaleString()}
        
      <section className='data-section-datetime'>
        <ul className='data-datetime-ul'>
          {
            dvcDatetimes.map((val, key) => (
            <li className='data-datetime-li' 
              key={key}
              onClick={() => setdatetimeidx(key)}>
              <span data-hover={val}>
                {new Date(val).toLocaleString()}
              </span> 
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default DataInfo