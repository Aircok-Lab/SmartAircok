// import React, { useState, useEffect, useRef } from 'react'

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// import { useSelector } from 'react-redux';
// import { RootState } from '@/items/RootReducer';

// import DndComp from './DndComp'

// import { dataseq, componentseq } from '../../../../items/ItemSequences'

// // import { GaugeProps, CompProps } from '@/items/Interfaces';
// import { CompProps } from '@/items/Interfaces';

// import './Data1.css'

// const Data = () => {
//   // 컴포넌트 순서 (dnd)
//   const [comps, setComps] = useState<string[]>(componentseq);

//   // 장비 리스트
//   const [datalist, setdatalist] = useState<string[]>([...useSelector((state : RootState) => state.actDatas.devices).keys()]);

//   const [datalistchk, setdatalistchk] = useState<string>(datalist[0]);
//   const [datalistpopup, setdatalistpopup] = useState<boolean>(false);
//   const [datalistsearch, setdatalistsearch] = useState<string[]>(datalist.slice(5, datalist.length));

//   const gaugeparam : Map<string, any>[] = useSelector((state : RootState) => state.actDatas.devices).get(datalistchk);


//   // 각 컴포넌트에 사용될 변수들 (DndComp에서 정의하니 rerender 안되어 여기서 정의 후 parameter로 넘겨줌)
//   const [datetimeidx, setdatetimeidx] = useState<number>(gaugeparam.length - 1);

//   const gaugedatetimes : number[] = []
//   gaugeparam.forEach((value) => {
//     gaugedatetimes.push(new Map(Object.entries(value)).get("data_reg_dt"))
//   })

//   // 형태는 map이지만 map의 함수가 동작하지 않아서 새로 new Map으로 정의
//   const gaugemap : Map<string, any> = new Map(Object.entries(gaugeparam.slice(datetimeidx)[0]));
//   gaugemap.delete("data_reg_dt")
  
//   const gaugelabels = dataseq.filter(label => [...gaugemap.keys()].includes(label))
//   const [gaugedatas, setgaugedatas] = useState<number[]>([]);

//   useEffect(() => {
//     Object.entries(gaugeparam.slice(datetimeidx)[0]).forEach(([key, val]) => {
//       gaugemap.set(key, val)
//     })
//     gaugemap.delete("data_reg_dt")

//     const newgaugedatas : number[] = []
//     dataseq.map((key) => {
//       return(gaugemap.forEach((paramval, paramkey) => {
//         if(key === paramkey){
//           newgaugedatas.push(paramval)
//         }
//       }))
//     });
//     setgaugedatas(newgaugedatas)

//   }, [datetimeidx])

//   const moveComp = ({id, index} : CompProps) => {
//     const comp_idx = comps.indexOf(id);
//     const newcomps : string[] = [...comps];
//     newcomps.splice(comp_idx, 1);
//     newcomps.splice(index, 0, id);
//     setComps(newcomps)
//  };

//   // 리스트 목록 클릭 ref
//   const listpopupRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (datalistpopup) {
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//      }
//    }
//     return undefined;
//   }, [datalistpopup]);

//   // 장비 교체 시 전역변수의 값 호출하여 변경
//   const rerenderChart = (val : string) => {
//     setdatalistchk(val);
//  }

//   const rerender_datalist = (choose : number) => {
//     const newlist : string[] = [datalist[choose], ...datalist.slice(0, choose), ...datalist.slice(choose + 1, datalist.length)]

//     setdatalist(newlist);
//     setdatalistpopup(false);
//     setdatalistsearch(newlist.slice(5, datalist.length));

//     rerenderChart(datalist[choose]);
//  }

//   // 기기 리스트 팝업 ... 버튼
//   const listpopup = () => {
//     return (
//       <section className='data-section-datalist' ref={listpopupRef}>
//         <input 
//           type='text'
//           className='data-datalist-search'
//           placeholder='Search'
//           onChange={(e) => {setdatalistsearch(datalist.slice(5, datalist.length).filter((param : string) => param.match(e.target?.value)))}}
//         />

//         <ul className='data-datalist-ul'>
//           {
//             datalistsearch.map((val, key) => (
//             <li className='data-datalist-li' 
//               key={key} 
//               onClick={() => rerender_datalist(datalist.findIndex((param : string) => param.match(val)))}>
//               <span data-hover={val}>
//                 {val}
//               </span> 
//             </li>
//           ))}
//         </ul>
//       </section>
//     );
//  }

//   // ... 버튼 바깥 누를 시 팝업종료
//   const handleClickOutside = (e : MouseEvent) => {
//     const handleClickOutsidechk : boolean= ((e.target as Element).innerHTML.includes('...')) || ((e.target as Element).closest('section')?.className === 'data-section-datalist')
//     if (!handleClickOutsidechk){
//       setdatalistpopup(false);
//     }
//   }

//   return (
//     <>
//       <section className='data-section-header'>
//         <ul className='data-header-ul'>
//           {datalist.slice(0, 5).map((val, key) => (
//              <li className='data-header-li' key={key}>
//               <input
//                 id={val}
//                 type="radio"
//                 className="data-header-li-radio"
//                 value={val}
//                 checked={val === datalistchk}
//                 onChange={() => rerenderChart(val)}
//               />
//               <label className="data-header-li-radio-label" htmlFor={val}> 
//                 <span data-hover={val}>
//                   {val}
//                 </span> 
//               </label>
//              </li> 
//           ))}
//           {(datalist.length > 5) ?
//               <li className='data-header-li-etc'
//                 onClick={() => setdatalistpopup(true)}>
//                 <span data-hover='radio-etc'>
//                   ...
//                 </span>
//               </li>  : <></>
//          }
//         </ul>
//       </section>

//       {
//         (datalistpopup === true) ? listpopup() : <></>
//      }

//       <section className='data-section-body'>
//         <DndProvider backend={HTML5Backend}>
//           {comps.map((val, key) => {
//             return <DndComp key={key} id={val} index={key} moveComp={moveComp} 
//                       gaugemap={gaugemap} gaugelabels={gaugelabels} gaugedatas={gaugedatas}
//                       datetimeidx={datetimeidx} gaugedatetimes={gaugedatetimes} setdatetimeidx={setdatetimeidx}
//                     />
//          })}
//         </DndProvider>
//       </section>
//     </>
//   );
// }

// export default Data;