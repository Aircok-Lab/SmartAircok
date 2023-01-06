import React, { useState, useRef } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '@/items/RootReducer'

import MonitoringDevice from './device/Device'
import MonitoringData from './data/Data'
// import MonitoringData1 from './monitoring/data/Data1'
import MonitoringStatistics from './statistics/Statistics'

import { MonitoringProps } from '../../../items/Interfaces'

const Monitoring = ({ cn, setasidelistchk } : MonitoringProps) => {
  const dvclists = [...useSelector((state : RootState) => state.actLatests.latests)].map((val) => {return [val.sn, val.dvc_mng_nm]})

  const [searchlists, setsearchlists] = useState<string[][]>(dvclists)
  const [popuplists, setpopuplists] = useState<string[][]>(dvclists)

  const dvctab = useRef<number>(1)

  const monitoringDvcClick = (sn : string) => {
    const monitoringClickedNum = popuplists.map((val) => val[0]).indexOf(sn)
    if(popuplists.slice(0, dvctab.current).map((val) => val[0]).indexOf(sn) === -1){
      dvctab.current = (dvctab.current + 1 > 5) ? 5 : dvctab.current + 1
    }
    setpopuplists([popuplists[monitoringClickedNum], ...popuplists.slice(0, monitoringClickedNum), ...popuplists.slice(monitoringClickedNum + 1, popuplists.length)])
    setasidelistchk('monitoringdata')
  }

  const articleComp = () => {
    switch(cn){
      case 1 :
        return <MonitoringDevice 
                  dvclists={dvclists}
                  searchlists={searchlists}
                  setsearchlists={setsearchlists}
                  monitoringDvcClick={monitoringDvcClick}
                />
      case 2 :
        return <MonitoringData 
                  popuplists={popuplists}
                  setpopuplists={setpopuplists}
                  dvctab={dvctab}
                />
      case 3 :
        return <MonitoringStatistics />
      default :
        return <></>
    }
  }


  return (
    <>
      {articleComp()}
    </>
  )
}

export default Monitoring