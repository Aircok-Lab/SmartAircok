import React, { useState, useEffect, useRef } from 'react'

// import {ChartType } from './Auth';

import { GaugeProps } from '../items/Interfaces';

import './Gauge.css'

const Gauge = ({iaq} : GaugeProps) => {
  // 통합공기질 치수
  const chartval = iaq

  const gaugestartdegree : number = -20;

  const [gaugedegree, setgaugedegree] = useState<number>(gaugestartdegree);

  const savedCallback = useRef<number>(gaugestartdegree);

  useEffect(() => {
    setgaugedegree(gaugestartdegree);
    savedCallback.current = gaugestartdegree;

    const bg_func = setInterval(() => {
      if(savedCallback.current >= 3.6 * chartval + gaugestartdegree){
        clearInterval(bg_func);
      }
      else{
        setgaugedegree(savedCallback.current++);
      }
    }, 3);
  }, [chartval]);

  const polarToCartesian = (centerX : number, centerY : number, radius : number, angleInDegrees : number) => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  const describeArc = (x : number, y : number, radius : number, startAngle : number, endAngle : number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
  
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
    const d = [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  
    return d;
  }

  return (
    <svg className='gauge-chart' viewBox='0 0 24 24'>
      <circle 
        className='chart-bg'
        cx='12'
        cy='12'
        r='10'
        fill='none'
        stroke='#c4c4c4'
        strokeWidth='1'
      />

      <path 
        className='chart-value'
        fill='none'
        stroke='#f9b10a'
        strokeWidth='2'
        strokeLinecap='round'
        d={describeArc(12, 12, 10, gaugestartdegree, gaugedegree)}
      />

      <text className='chart-value-text'
        x='50%'
        y='50%'
        dominantBaseline="middle"
        textAnchor="middle"
      > 
        {chartval}%
      </text>
    </svg>
  );
}

export default Gauge;