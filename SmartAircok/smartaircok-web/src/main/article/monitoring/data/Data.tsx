import React, { useState, useEffect }  from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/items/RootReducer'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import PopupList from './PopupList'
import DndComp from './DndComp'
// import Gauge from '../../../../components/Gauge'

import { categoriseq } from '../../../../items/ItemSequences'

import { MonitoringDataProps } from '../../../../items/Interfaces';

import { ReactComponent as Circleico } from '../../../../img/circle.svg';
import closeIco from '../../../../img/close.svg';

import './Data.css'

const Data = ({ popuplists, setpopuplists, dvctab } : MonitoringDataProps) => {
  const [dvclistchk, setdvclistchk] = useState<string>(popuplists[0][0]);
  const [dvclistpopup, setdvclistpopup] = useState<boolean>(false);

  // 컴포넌트 배치
  const dispatch = useDispatch()
  const dvcDatas = useSelector((state : RootState) => state.actDatas.devices)

  const [comps, setComps] = useState<string[]>([])
  const [clickedsensor, setclickedsensor] = useState<string>('')

  // const [datetimeidx, setdatetimeidx] = useState<number>(dvcDatas.length - 1);
  // const [datetimeidx] = useState<number>(dvcDatas.length - 1);
  
  useEffect(() => {
    dispatch({ 
      type: "SAGA_DATAS",
      data : {
        sn : dvclistchk,
        st : new Date().getTime(),
        et : new Date().setHours(new Date().getHours() - 1)
      }
    });
  }, [])

  useEffect(() => {
    if(dvcDatas){
      setComps(Array.from(categoriseq.keys()).filter(label => Object.keys(dvcDatas[dvcDatas.length - 1]).includes(label)))
      setclickedsensor(Object.keys(dvcDatas[dvcDatas.length - 1])[0])
    }
  },[dvcDatas])
  
  // x button to pop tab
  function popupTab(sn : string, key : number){
    setpopuplists([...popuplists.slice(0, key), ...popuplists.slice(key + 1, dvctab.current), ...popuplists.slice(dvctab.current, popuplists.length), popuplists[key]]);
    if(dvclistchk === sn){
      setdvclistchk(popuplists[key === 0 ? 1 : key - 1][0]);
    }
    dvctab.current -= 1
  }
  
  // 장비 교체 시 전역변수의 값 호출하여 변경
  function rerenderChart(val : string){
    setdvclistchk(val);
  }

  function rerenderDvclists(choose : number){
    setpopuplists([popuplists[choose], ...popuplists.slice(0, choose), ...popuplists.slice(choose + 1, popuplists.length)]);
    setdvclistpopup(false);

    rerenderChart(popuplists[choose][0]);
  }

  function gridbuilder(){
    const str = []
    const gridlen = comps.length + ((comps.length % 4) === 0 ? 0 : (4 - comps.length % 4))

    for(let i = 0; i < gridlen; i++){
      if(i % 4 === 0){
        str.push('"')
      }
      str.push('div')
      if(i % 4 === 3){
        str.push('"')
      }
      else{
        str.push(' ')
      }
    }
    return [str.join(''), 'repeat(4, 1fr)', 'repeat(' + gridlen/4 + ', 1fr)']
  }

  const mygrid = gridbuilder()

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
              onClick={(e) => (e.target as HTMLElement).className === 'data-tabs-li-close' ? {} : rerenderChart(sn)} >
                <p className='data-tabs-li-p' style={(sn === dvclistchk)?{borderColor : 'blue'}:{}}> {name} </p>
                <img src={ closeIco } className='data-tabs-li-close' alt='data-tabs-li-close' onClick={()=>popupTab(sn, key)}/>
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
        <PopupList popuplists={popuplists} dvctab={dvctab} dvclistpopup={dvclistpopup} setdvclistpopup={setdvclistpopup} rerenderDvclists={rerenderDvclists} /> 
        : <></>}

      <section className='data-infos1'>
        <section className='data-infos'>
          <section className='data-iaq'> 
            <p className='data-iqa-title'> 통합공기질 </p>
          </section>
          <section className='data-graph'> 
            <p className='data-graph-title'> {clickedsensor} </p>
          </section>
          <section className='data-dnds' style={{gridTemplateAreas:mygrid[0], gridTemplateColumns:mygrid[1]}}>
            <DndProvider backend={HTML5Backend}>
              {comps.map((val, key) => {
                return <DndComp key={key} id={val} index={key} comps={comps} setComps={setComps} clickedsensor={clickedsensor} setclickedsensor={setclickedsensor}
                          // dvcDatas={dvcDatas} dvcDatetimes={dvcDatas.map((val) => val.data_reg_dt)} datetimeidx={datetimeidx} setdatetimeidx={setdatetimeidx}
                        />
              })}
            </DndProvider>
          </section>
        </section>
      </section>

    </section>
  );
};

export default Data;