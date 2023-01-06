import React from 'react'

import { dataseq } from '../items/ItemSequences';
import { DeviceProps } from '@/items/Interfaces';

const DeviceTable = ({ mydevices } : DeviceProps) => {
	const tableKey = [...mydevices.keys()]
  const tableVal = (tableKey : string) : Object => {
    return mydevices.get(tableKey).slice(-1)[0]
  }

  return (
    <table className='deviceTable'>
      <thead>
        <tr>
          {dataseq.map((val, key) => {
              return (
                <th key={key} className={'th_' + val}> {val} </th>
              )
            })}
        </tr>
      </thead>

      <tbody>
        {tableKey?.map((seqval, seqkey) => {
            return (
              <tr key={seqkey}>
                <td className={'td_' + dataseq[seqkey]}>{seqval}</td>
                {dataseq.slice(1).map((headerval, headerkey) => {
                    if(tableVal(tableKey[seqkey]) === null || tableVal(tableKey[seqkey]) === undefined)
                      return <td key={headerkey}> - </td>
                    
                    const filtermap = Object.entries(tableVal(tableKey[seqkey]))
                      ?.filter(([mapkey]) => mapkey === headerval || (headerval === 'date' && mapkey === 'data_reg_dt'))

                    return <td key={headerkey} className={'td_' + headerval}> { filtermap.length === 0 ? '-' : filtermap[0][1]} </td>
                  })}
              </tr>
            );
          })
        }
      </tbody>
    </table>
  )
}

export default DeviceTable;