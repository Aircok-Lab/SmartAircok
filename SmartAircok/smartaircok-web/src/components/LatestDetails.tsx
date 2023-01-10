import React from 'react'

import GaugeBar from './GaugeBar';

import { LatestDetailsProps } from '@/items/Interfaces'

import { dashseq, categoriseq, colorseq, getRange } from '../items/ItemSequences'

import { ReactComponent as Circleico } from '../img/circle.svg';

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

  // function getRange(chkval : number, rangelist : number[]){
  //   for(var i = 0; i < rangelist.length; i++){
  //   if(rangelist[i] > chkval)
  //     return i
  //   }
  //   return 0
  // }

  return (
    <>
      {dashseq.map((val, key) => {
          const mystyle = colorseq.get(getRange(val, getValues(val)))
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
                <GaugeBar val={getValues(val)} color={mystyle.color}/>
              </div>
              <div className='detail-list-val'> 
                {getValues(val)} 
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default LatestDetails