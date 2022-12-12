import React, {useState, useEffect, useRef} from 'react'

import {GaugeInfoBarProps} from '../items/interfaces';


const GaugeInfoBar = ({val} : GaugeInfoBarProps) => {

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
    <rect x='0' y='0' width={gaugedegree + '%'} height='100%' fill='#aaaaaa'/>
  );
}

export default GaugeInfoBar;