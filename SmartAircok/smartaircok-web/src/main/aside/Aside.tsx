import React, { useState } from 'react'

import { AsideProps, AsideListProps } from '../../items/Interfaces';

import { asideseq } from '../../items/ItemSequences'

import { ReactComponent as Arrowico } from '../../img/arrow.svg';
import { ReactComponent as Squareico } from '../../img/square.svg';

import './Aside.css'

const Aside = ({asidelistchk, setasidelistchk} : AsideListProps) => {
  const [asideExp, setasideExp] = useState<boolean>(false);

  const asidelist : AsideProps[] = asideseq;

  // 선택한 aside 1차 depth
  const [checkedaside, setcheckedaside] = useState<string>(asidelist[0].val)

  // aside 목록 클릭 확장 여부
  // const [checkedasides, setcheckedasides] = useState<boolean[]>(new Array(asidelist.length).fill(false))

  return (
    <aside className='aircok-aside'>
      <ul className='aside-manage'>
        {asidelist.map((aside, key) => {
          // const isasidechk : boolean = aside.val === asidelistchk_split[0]
          const isasidechk : boolean = checkedaside === aside.val
          return (
            <li className='aside-manage-li' key={key}>
              <input
                id={aside.val}
                type='radio'
                className='aside-manage-li-radio'
                value={aside.val}
                checked={isasidechk}
                onChange={() => {
                  setcheckedaside(aside.val)
                  if(aside.val === 'dashboard') setasidelistchk(aside.val)
                }}
                // aside 목록 확장 유지
                // onClick={()=>{
                //   const newcheckedasides : boolean[] = [...checkedasides]
                //   newcheckedasides.splice(key, 1, !newcheckedasides[key])
                //   setcheckedasides(newcheckedasides)
                // }}
              />
                <label className='aside-manage-li-radio-label' htmlFor={aside.val}> 
                  <section className='aside-manage-li-radio-label-title'>
                    <Squareico className='aside-manage-li-ico' 
                      stroke={isasidechk ? '#758cf7' : 'black'} 
                      strokeWidth={isasidechk ? '1' : '0'}
                    />
                    <p className='aside-manage-li-radio-label-p' data-hover={aside.label}>
                      {aside.label}
                    </p>
                  </section>
                  {
                    aside.val === 'dashboard' ? <></> :
                    <Arrowico 
                      className='aside-manage-li-detail-exp' 
                      fill={isasidechk ? '#758cf7' : 'black'}
                      transform={isasidechk ? 'rotate(90)' : 'rotate(270)'}
                    />
                  }
                </label>
              {isasidechk ? 
                <ul className='daside-manage'>
                  {aside.detail?.map((daside, key) => {
                  const isdasidechk : boolean = (aside.val + daside.dval) === asidelistchk
                    return (
                        <li className='daside-manage-li' key={key} style={isdasidechk? {color:'#758cf7'} : {}} >
                          <input
                            id={aside.val + daside.dval}
                            type='radio'
                            className='daside-manage-li-radio'
                            value={aside.val + daside.dval}
                            checked={isdasidechk}
                            onChange={() => setasidelistchk(aside.val + daside.dval)}
                          />
                          <label className='daside-manage-li-radio-label' htmlFor={aside.val + daside.dval}> 
                            <p className='daside-manage-li-radio-label-p' data-hover={daside.dlabel}>
                              {daside.dlabel}
                            </p>
                          </label>
                        </li>
                    )
                  })}               
                </ul> 
                : <></>
              }
            </li>
          )
        })}
      </ul> 

      <Arrowico 
        className='aside-exp' 
        fill='#758cf7' 
        onClick={() => setasideExp(!asideExp)}
        transform={asideExp?'rotate(180)':''}
      />
    </aside>
  );
}

export default Aside;