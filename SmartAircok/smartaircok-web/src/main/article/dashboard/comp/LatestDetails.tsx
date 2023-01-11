import React from 'react'

import Bar from '../../../../components/Bar';

import { LatestDetailsProps } from '@/items/Interfaces'

import { getDataStyle } from '../../../../items/Functions'

import { dashseq, categoriseq } from '../../../../items/ItemSequences'

import { ReactComponent as Circleico } from '../../../../img/circle.svg';

import './LatestDetails.css'

const LatestDetails = ({ latestdata } : LatestDetailsProps) => {

  const getValues = (tag : string) => {
    switch(tag) {
      case 'pm10' :
        return latestdata?.pm10
      case 'pm25' :
        return latestdata?.pm25
      case 'tem' :
        return latestdata?.tem
      case 'hum' :
        return latestdata?.hum
      default :
        return 0
    }
  }

  return (
    <>
      {dashseq.map((val, key) => {
          const myval = getValues(val)
          const mystyle = getDataStyle(val, myval)
          return (
            <div className='detail-lists' key={key}>
              <div className='detail-list-name'> 
                {categoriseq.get(val).text}
              </div>
              <div className='detail-list-text' style={{color:mystyle.color}}> 
                <Circleico fill={mystyle.color} />
                {mystyle.text}
              </div>
              <div className='detail-list-bar'> 
                <Bar val={myval} color={mystyle.color}/>
              </div>
              <div className='detail-list-val'> 
                {myval} 
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default LatestDetails