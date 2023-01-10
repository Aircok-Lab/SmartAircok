import React, { useState, useRef } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '@/items/RootReducer'

// Dashboard
import Dashboard from './dashboard/Dashboard'

// Monitoring
import MonitoringDevice from './monitoring/device/Device'
import MonitoringData from './monitoring/data/Data'
// import MonitoringData1 from './monitoring/data/Data1'
import MonitoringStatistics from './monitoring/statistics/Statistics'

//manage
import ManageUser from './manage/user/User'
import ManageDevice from './manage/device/Device'
import ManagePosition from './manage/position/Position'
import ManageCommon from './manage/common/Common'
import ManageAPI from './manage/api/API'

//board
import BoardFree from './board/free/Free'
import BoardQna from './board/qna/Qna'
import BoardFaq from './board/faq/Faq'

import { ArticleProps } from '../../items/Interfaces';

import { asideseq } from '../../items/ItemSequences'

import './Article.css'

const Article = ({asidelistchk, setasidelistchk} : ArticleProps) => {
  const asidecontents : string[] = asideseq.map((seq) => seq.detail.length > 0 ? seq.detail.map((dseq) => seq.val + dseq.dval) : seq.val).join().split(",")

  // monitoring variables
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
    setasidelistchk(asidecontents[2])
  }

  const articleComp = () => {
    switch(asidelistchk){
      // dashboard
      case asidecontents[0] :
        return <Dashboard />
      // monitoring
      case asidecontents[1] :
        return <MonitoringDevice dvclists={dvclists} searchlists={searchlists} setsearchlists={setsearchlists} monitoringDvcClick={monitoringDvcClick}/>
      case asidecontents[2] :
        return <MonitoringData popuplists={popuplists} setpopuplists={setpopuplists} dvctab={dvctab}/>
      case asidecontents[3] :
        return <MonitoringStatistics />
      case asidecontents[4] :
        return <MonitoringStatistics />
      // manage
      case asidecontents[5] :
        return <ManageUser />
      case asidecontents[6] :
        return <ManageDevice />
      case asidecontents[7] :
        return <ManagePosition />
      case asidecontents[8] :
        return <ManageCommon />
      case asidecontents[9] :
        return <ManageAPI />
      // board
      case asidecontents[10] :
        return <BoardFree />
      case asidecontents[11] :
        return <BoardQna />
      case asidecontents[12] :
        return <BoardFaq />
      default :
        return <></>
    }
  }

  return (
    <article className='aircok-article'>
      {articleComp()} 
    </article>
  );
}

export default Article;