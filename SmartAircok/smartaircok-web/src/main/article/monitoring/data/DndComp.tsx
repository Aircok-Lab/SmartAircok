import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

import DataInfo from '../../../../components/DataInfo'
import Gauge from '../../../../components/Gauge'
import GaugeInfo from '../../../../components/GaugeInfo'
import RadarGraph from '../../../../components/RadarGraph'

// import { dataseq } from '../../../items/ItemSequences';

import { DndProps } from '@/items/Interfaces';

import './DndComp.css'


const Dnd = ({ id, index, moveComp, gaugemap, gaugelabels, gaugedatas, gaugedatetimes, datetimeidx, setdatetimeidx } : DndProps) => {
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

  const DndComp = () => {
    switch(id){
      case 'info' :
        return <DataInfo gaugedatetimes={gaugedatetimes} datetimeidx={datetimeidx} setdatetimeidx={setdatetimeidx}/>
      case 'gauge' :
        return <Gauge gaugemap={gaugemap}/>
      case 'gaugeinfo' :
        return <GaugeInfo gaugemap={gaugemap}/>
      case 'radar' :
        return <RadarGraph gaugelabels={gaugelabels} gaugedatas={gaugedatas}/>
      default :
        return <>{id}</>
    }
  }

  return (
    <div className={'dndcompnent' + index} ref={node => dragRef(dropRef(node))}>
      {DndComp()}
    </div>
  );
}

export default Dnd;
