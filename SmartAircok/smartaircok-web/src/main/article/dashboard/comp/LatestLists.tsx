import React from 'react'

import { LatestListsProps } from '@/items/Interfaces'

import { colorseq } from '../../../../items/ItemSequences'

import { ReactComponent as Circleico } from '../../../../img/circle.svg';

import './LatestLists.css'

const LatestLists = ({ latestdatas, picker, setpicker } : LatestListsProps) => {
  return (
    <table className='latests'>
      <thead>
        <tr>
          <th className='latest-th-nm'> 설치위치 </th>
          <th className='latest-th-date'> 수신 시간 </th>
          <th className='latest-th-sensor'> 센서 상태 </th>
          <th className='latest-th-iaq'> 통합공기질 수치 </th>
        </tr>
      </thead>

      <tbody>
        {latestdatas.map((val, key) => {
          // 통합공기질수치 등급
          const iaqst = Math.floor(val.iaq / 25)
          return (
            <tr className='latest_tr' key={key} onClick={()=>{setpicker(key)}} style={picker === key? {color:'#758cf7'} : {}}>
              <td className='latest-td-nm'> {val.dvc_mng_nm} </td>
              <td className='latest-td-date'> {new Date(val.data_reg_dt).toLocaleString()} </td>
              <td className='latest-td-sensor'> {!(val.comm_badn || val.sensor_badn || val.power_badn || val.power_st) ? '수신 중' : '-'} </td>
              <td className='latest-td-iaq'> 
                <div className='latest-iaq-val'> {val.iaq} </div>
                <Circleico fill={colorseq.get(iaqst).color} />
                <div className='latest-iaq-text' style={{color:colorseq.get(iaqst).color}}> {colorseq.get(iaqst).text} </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default LatestLists