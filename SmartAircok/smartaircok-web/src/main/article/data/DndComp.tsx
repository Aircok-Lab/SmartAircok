import React from 'react'
import {useDrag, useDrop} from 'react-dnd'

import Gauge from '../../../components/Gauge'
import GaugeInfo from '../../../components/GaugeInfo'
import Graph from '../../../components/Graph'

import {ItemTypes} from '../../../items/types';
import {DndProps} from '../../../items/interfaces';

import './DndComp.css'


const Dnd = ({id, index, moveComp, gaugeparam} : DndProps) => {

  const [, dragRef] = useDrag(
    () => ({
      type: ItemTypes.Comp,
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
    accept : ItemTypes.Comp,
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
      case 'gauge' :
        return <Gauge gaugeparam={gaugeparam}/>
      case 'gaugeinfo' :
        return <GaugeInfo gaugeparam={gaugeparam}/>
      case 'graph' :
        return <Graph gaugeparam={gaugeparam}/>
      default :
        return <>{id}</>
     }
   }

  return (
    <div className='dndcompnent' ref={node => dragRef(dropRef(node))}>
      <DndComp />
    </div>
  );
}

export default Dnd;
