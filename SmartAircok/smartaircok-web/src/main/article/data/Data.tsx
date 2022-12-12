import React, {useState, useEffect, useRef} from 'react'

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import DndComp from './DndComp'

// import APIs from '@/api/APIs'

import {GaugeProps, CompProps} from '../../../items/interfaces';

import './Data.css'

const Data = () => {
  // 컴포넌트 순서 (dnd)
  const [comps, setComps] = useState<string[]>(['gauge', 'gaugeinfo', 'graph', '11', '22', '33']);

  // 장비 리스트
  const [datalist, setdatalist] = useState<string[]>([
		'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
	]);

  const [datalistchk, setdatalistchk] = useState<string>(datalist[0]);
  const [datalistpopup, setdatalistpopup] = useState<boolean>(false);
  const [datalistsearch, setdatalistsearch] = useState<string[]>(datalist.slice(5, datalist.length));
  
  const [gaugeparam, setgaugeparam] = useState<GaugeProps>({
		param1 : Math.floor(Math.random() * 100) + 1,
		param2 : Math.floor(Math.random() * 100) + 1,
		param3 : Math.floor(Math.random() * 100) + 1,
		param4 : Math.floor(Math.random() * 100) + 1,
		param5 : Math.floor(Math.random() * 100) + 1
 });

  const moveComp = ({id, index} : CompProps) => {
    const comp_idx = comps.indexOf(id);
    const newcomps : string[] = [...comps];
    newcomps.splice(comp_idx, 1);
    newcomps.splice(index, 0, id);
    setComps(newcomps)
 };

  const listpopupRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datalistpopup) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
     }
   }
    return undefined;
 }, []);

  const rerender_chart = (val : string) => {
    const myval1 = Math.floor(Math.random() * 100) + 1;
    const myval2 = Math.floor(Math.random() * 100) + 1;
    const myval3 = Math.floor(Math.random() * 100) + 1;
    const myval4 = Math.floor(Math.random() * 100) + 1;
    const myval5 = Math.floor(Math.random() * 100) + 1;

    setdatalistchk(val);
    // setchartval(Math.floor(Math.random() * 100) + 1);
    setgaugeparam({param1 : myval1, param2 : myval2, param3 : myval3, param4 : myval4, param5 : myval5});
 }

  const rerender_datalist = (choose : number) => {
    const newlist : string[] = [datalist[choose], ...datalist.slice(0, choose), ...datalist.slice(choose + 1, datalist.length)]

    setdatalist(newlist);
    setdatalistpopup(false);
    setdatalistsearch(newlist.slice(5, datalist.length));

    rerender_chart(datalist[choose]);
 }

  const listpopup = () => {
    return (
      <section className='data-section-datalist' ref={listpopupRef}>
        <input 
          type='text'
          className='data-datalist-search'
          placeholder='Search'
          onChange={(e) => {setdatalistsearch(datalist.slice(5, datalist.length).filter((param : string) => param.match(e.target?.value)))}}
        />

        <ul className='data-datalist-ul'>
          {
            datalistsearch.map((val, key) => (
            <li className='data-datalist-li' 
              key={key} 
              onClick={() => rerender_datalist(datalist.findIndex((param : string) => param.match(val)))}>
              <span data-hover={val}>
                {val}
              </span> 
            </li>
          ))}
        </ul>
      </section>
    );
 }

  const handleClickOutside = (e : MouseEvent) => {
    if (listpopupRef && !listpopupRef.current?.contains(e.target as Node)) {
      setdatalistpopup(false);
   }
    else {
      setdatalistpopup(true);
   }
 }

  return (
    <>
      <section className='data-section-header'>
        <ul className='data-header-ul'>
          {datalist.slice(0, 5).map((val, key) => (
             <li className='data-header-li' key={key}>
              <input
                id={val}
                type="radio"
                className="data-header-li-radio"
                value={val}
                checked={val === datalistchk}
                onChange={() => rerender_chart(val)}
              />
              <label className="data-header-li-radio-label" htmlFor={val}> 
                <span data-hover={val}>
                  {val}
                </span> 
              </label>
             </li> 
          ))}
          {
            (datalist.length > 5) ?
              <li className='data-header-li-etc'
                onClick={() => setdatalistpopup(true)}>
                <span data-hover='radio-etc'>
                  ...
                </span>
              </li>  : <></>
         }

        </ul>
      </section>

      {
        (datalistpopup === true) ? listpopup() : <></>
     }

      <section className='data-section-body'>
        {/* <section className='data-section-gauge'>
          <Gauge gaugeparam={gaugeparam}/>
          <GaugeInfo gaugeparam={gaugeparam}/>
        </section>

        <section className='data-section-graph'>
          <Graph gaugeparam={gaugeparam}/>
        </section> */}

        <DndProvider backend={HTML5Backend}>
          {comps.map((val, key) => {
            return <DndComp id={val} index={key} moveComp={moveComp} gaugeparam={gaugeparam}/>
         })}
        </DndProvider>
      </section>
    </>
  );
}

export default Data;