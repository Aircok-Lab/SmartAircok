import React, { useState }  from 'react';

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// import { dataseq, componentseq } from '../../../../items/ItemSequences'

import PopupList from './PopupList'
// import DndComp from './DndComp'

import { MonitoringDataProps } from '../../../../items/Interfaces';

import { ReactComponent as Circleico } from '../../../../img/circle.svg';

import './Data.css'

const Data = ({ popuplists, setpopuplists, dvctab } : MonitoringDataProps) => {
  const [dvclistchk, setdvclistchk] = useState<string>(popuplists[0][0]);
  const [dvclistpopup, setdvclistpopup] = useState<boolean>(false);

  // 컴포넌트 순서 (dnd)
  // const [comps, setComps] = useState<string[]>(componentseq);

  // 장비 교체 시 전역변수의 값 호출하여 변경
  const rerender_chart = (val : string) => {
    setdvclistchk(val);
 }

  const rerender_dvclists = (choose : number) => {
    setpopuplists([popuplists[choose], ...popuplists.slice(0, choose), ...popuplists.slice(choose + 1, popuplists.length)]);
    setdvclistpopup(false);

    rerender_chart(popuplists[choose][0]);
 }

  return (
    <section className='data-body'>
      <section className='data-banner'>
        <p className='data-title'> 데이터 모니터링 </p>

        <section className='data-report'>
          <Circleico fill='green'/>
          <input className='data-report-btn' type='button' value='Format Download'/>
          <input className='data-report-btn' type='button' value='Excel Download'/>
        </section>
      </section>
      
      <section className='data-tabs'>
        <ul className='data-tabs-ul'>
          {popuplists.slice(0, dvctab.current).map(([sn, name], key) => (
             <li 
              className='data-tabs-li' 
              key={key}
              style={(sn === dvclistchk)?{backgroundColor : '#dddddd'}:{}}
              onClick={() => rerender_chart(sn)} >
                <p className='data-tabs-li-p' style={(sn === dvclistchk)?{borderColor : 'blue'}:{}}> {name} </p>
             </li>
          ))}
          {(popuplists.length > dvctab.current) ?
              <li className='data-tabs-li-etc'
                onClick={() => setdvclistpopup(true)}>
                <span data-hover='radio-etc'>
                  ...
                </span>
              </li>  : <></>
         }
        </ul>
      </section>

      {(dvclistpopup === true) ? 
        <PopupList popuplists={popuplists} dvctab={dvctab} dvclistpopup={dvclistpopup} setdvclistpopup={setdvclistpopup} rerender_dvclists={rerender_dvclists}/> 
        : <></>}

      <section className='data-infos'>
        {/* <DndProvider backend={HTML5Backend}>
            {comps.map((val, key) => {
              return <DndComp key={key} id={val} index={key} moveComp={moveComp} 
                        gaugemap={gaugemap} gaugelabels={gaugelabels} gaugedatas={gaugedatas}
                        datetimeidx={datetimeidx} gaugedatetimes={gaugedatetimes} setdatetimeidx={setdatetimeidx}
                      />
          })}
        </DndProvider> */}
      </section>

    </section>
  );
};

export default Data;