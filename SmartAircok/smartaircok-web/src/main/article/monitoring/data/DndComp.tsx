import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

import Bar from '../../../../components/Bar'

import { getDataStyle } from '../../../../items/Functions';

import { categoriseq } from '../../../../items/ItemSequences'

import { DndProps, CompProps } from '@/items/Interfaces';

import './DndComp.css'


// const Dnd = ({ id, index, comps, setComps, clickedsensor, setclickedsensor, /*dvcDatas, dvcDatetimes, datetimeidx, setdatetimeidx*/ } : DndProps) => {
const Dnd = ({ id, index, comps, setComps, sensorvalue, clickedsensor, setclickedsensor } : DndProps) => {
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
  
  function moveComp({id, index} : CompProps){
    const comp_idx = comps.indexOf(id);
    const newcomps : string[] = [...comps];
    newcomps.splice(comp_idx, 1);
    newcomps.splice(index, 0, id);
    setComps(newcomps)
 };

  return (
    <div className='dndcompnent'
      ref={node => dragRef(dropRef(node))}
      onClick={() => setclickedsensor(id)}
      style={{borderColor : comps.indexOf(clickedsensor) === index ? 'red' : ''}}>
        
      <p className='dndcompnent-title'> {categoriseq.get(id).text} </p>
      <p className='dndcompnent-value'> {sensorvalue} {categoriseq.get(id).unit} </p>
      <Bar val={sensorvalue} color={getDataStyle(id, sensorvalue).color}/>
    </div>
  );
}

export default Dnd;
