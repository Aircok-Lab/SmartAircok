import React, { useState, useEffect, useRef } from 'react'

import { GaugeBarProps } from '../items/Interfaces';


const GaugeBar = ({val, color} : GaugeBarProps) => {

  const [gaugedegree, setgaugedegree] = useState<number>(0);

  const savedCallback = useRef<number>(0);

  useEffect(() => {
    setgaugedegree(0);
    savedCallback.current = 0;

    const bg_func = setInterval(() => {
      if(savedCallback.current >= val){
        clearInterval(bg_func);
      }
      else{
        setgaugedegree(savedCallback.current++);
      }
    }, 3);
  }, [val]);

  return (
    <svg className='gauge-bar'>
      <rect x='0' y='0' width='100%' height='100%' fill='#f2f2f2'/>
      <rect x='0' y='0' width={gaugedegree + '%'} height='100%' fill={color}/>
    </svg>
  );
}

export default GaugeBar;