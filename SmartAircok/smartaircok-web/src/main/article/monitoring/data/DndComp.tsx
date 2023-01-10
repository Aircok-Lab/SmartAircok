import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

// import DataInfo from '../../../../components/DataInfo'
// import Gauge from '../../../../components/Gauge'
// import GaugeInfo from '../../../../components/GaugeInfo'
// import RadarGraph from '../../../../components/RadarGraph'

import { DndProps, CompProps } from '@/items/Interfaces';

import './DndComp.css'


const Dnd = ({ id, index, comps, setComps, clickedsensor, setclickedsensor, /*dvcDatas, dvcDatetimes, datetimeidx, setdatetimeidx*/ } : DndProps) => {
  const [, dragRef] = useDrag(
    () => ({
      type: 'dnd',
      item: {id, index},
      collect : ( monitor ) => ({
        isDragging : monitor.isDragging(),
       }),
      // end : ( item, monitor ) => {
      //   const didDrop = monitor.didDrop();
      //   if (!didDrop) {
      //     moveComp({id : item.id, index : index}); 
      //  }
      //}
     }),
    [id, index, moveComp]
  );

  const [, dropRef] = useDrop(
    () => ({
    accept : 'dnd',
    canDrop : () => false,
    hover(hover_item : any) {
      if (id !== hover_item.id) {
        moveComp({id : hover_item.id, index : index});
       }
     },
   }),
    [moveComp]
  );

  function DndComp(){
    switch(id){
      // case 'info' :
      //   return <DataInfo dvcDatetimes={dvcDatetimes} datetimeidx={datetimeidx} setdatetimeidx={setdatetimeidx}/>
      // case 'gauge' :
      //   return <Gauge dvcDatas={dvcDatas[0]}/>
      // case 'gaugeinfo' :
      //   return <GaugeInfo dvcDatas={dvcDatas[0]}/>
      // case 'radar' :
      //   return <RadarGraph dvcDatas={dvcDatas[0]}/>
      default :
        return <div>{id}</div>
    }
  }
  
  function moveComp({id, index} : CompProps){
    const comp_idx = comps.indexOf(id);
    const newcomps : string[] = [...comps];
    newcomps.splice(comp_idx, 1);
    newcomps.splice(index, 0, id);
    setComps(newcomps)
 };

  return (
    <div className={'dndcompnent' + index}
      ref={node => dragRef(dropRef(node))}
      onClick={() => setclickedsensor(id)}
      style={{borderColor : comps.indexOf(clickedsensor) === index ? 'red' : ''}}
      >

      {DndComp()}
    </div>
  );
}

export default Dnd;
