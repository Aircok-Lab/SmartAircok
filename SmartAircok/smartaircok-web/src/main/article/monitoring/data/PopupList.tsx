import React, { useState, useEffect, useRef } from 'react';

import Search from '../../../../components/Search'

import { DevicePopupProps } from '@/items/Interfaces';

import './PopupList.css'

const PopupList = ({ popuplists, dvctab, dvclistpopup, setdvclistpopup, rerender_dvclists } : DevicePopupProps) => {
  const [searchLists, setsearchlists] = useState<string[][]>(popuplists.slice(dvctab.current, popuplists.length))

  // 리스트 목록 클릭 ref
  const listpopupRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dvclistpopup) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
     }
   }
    return undefined;
  }, [dvclistpopup]);

  // 팝업 리스트 바깥 누를 시 팝업종료
  const handleClickOutside = (e : MouseEvent) => {
    if(!(e.target as Element).className.includes('data-tabs-popup')){
      setdvclistpopup(false);
    }
  }

  return (
    <section className='data-tabs-popup' ref={listpopupRef}>
      <Search cname={'data-tabs-popup-search'} lists={popuplists.slice(dvctab.current, popuplists.length)} listopt={1} setFunc={setsearchlists}/>

      <ul className='data-tabs-popup-ul'>
        {searchLists.map(([sn, name], key) => (
          <li className='data-tabs-popup-li' 
            key={key} 
            onClick={() => {
              rerender_dvclists(searchLists.map((val) => val[0]).findIndex((param : string) => param.match(sn)) + dvctab.current)
              dvctab.current = (dvctab.current + 1 > 5) ? 5 : dvctab.current + 1
            }}>
            <p className='data-tabs-popup-li-p'> {name} </p> 
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopupList;