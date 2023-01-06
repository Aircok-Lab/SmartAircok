import React from 'react';

import { SearchProps } from '../items/Interfaces';

/**
 * 
 * @param cname : 클래스 이름
 * @param lists : 전체 리스트 (필터링 되지 않도록 원본 리스트)
 * @param listopt : 1차원 lists : -1 // 2차원 lists : 검색할 값의 요소 기입
 * @param setFunc : 필터링된 리스트 출력
 * @returns 검색창 및 검색 결과 리스트 반환
 */
const Search = ({ cname, lists, listopt, setFunc } : SearchProps) => {
  return (
    <input 
      type='text'
      className={cname}
      placeholder='Search ...'
      onChange={(e) => {setFunc(lists.filter((param : any) => (listopt === -1) ? param.match(e.target.value) : param[listopt].match(e.target.value)))}}
    />
  );
};

export default Search;