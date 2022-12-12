import React from 'react'

import {AsideListProps} from '../../items/interfaces';

import './Aside.css'


const Aside = ({asidelist, asidelistchk, setasidelistchk} : AsideListProps) => {
  return (
    <aside className='aircok-aside'>
      <ul className='aside-manage'>
        {asidelist.map((aside, key) => (
          <li className='aside-manage-li' key={key}>
            <input
              id={aside.val}
              type="radio"
              className="aside-manage-li-radio"
              value={aside.val}
              checked={aside.val === asidelistchk}
              onChange={() => setasidelistchk(aside.val)}
            />
            <label className="aside-manage-li-radio-label" htmlFor={aside.val}> 
              <span data-hover={aside.label}>
                {aside.label}
              </span> 
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;