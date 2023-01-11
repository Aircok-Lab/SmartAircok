import React, { useState, useEffect, useRef } from 'react'

import { BarProps } from '../items/Interfaces';


const Bar = ({val, color} : BarProps) => {

  const [degree, setdegree] = useState<number>(0);

  const savedCallback = useRef<number>(0);

  useEffect(() => {
    setdegree(0);
    savedCallback.current = 0;

    const bg_func = setInterval(() => {
      if(savedCallback.current >= val){
        clearInterval(bg_func);
      }
      else{
        setdegree(savedCallback.current++);
      }
    }, 3);
  }, [val]);

  return (
    <svg className='bar'>
      <rect x='0' y='0' width='100%' height='100%' fill='#f2f2f2'/>
      <rect x='0' y='0' width={degree + '%'} height='100%' fill={color}/>
    </svg>
  );
}

export default Bar;