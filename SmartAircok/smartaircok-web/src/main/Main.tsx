import React, {useState} from 'react';

import Aside from './aside/Aside'
import Article from './article/Article'
import Chatbot from '../chatbot/Chatbot'

import {AsideProps} from '../items/interfaces';

import './Main.css'

const Main = () => {
  const asidelist : AsideProps[] = [
		{val : "dash", label : "대시보드"},
		{val : "data", label : "데이터"},
		{val : "auth", label : "권한 관리"},
		{val : "org", label : "조직 관리"},
		{val : "api", label : "API 관리"}
	];

  const [asidelistchk, setasidelistchk] = useState<string>(asidelist[0].val)

  return (
    <main className='aircok-main'>
      <Aside asidelist={asidelist} asidelistchk={asidelistchk} setasidelistchk={setasidelistchk}/>
      <Article asidelist={asidelist} asidelistchk={asidelistchk}/>
      <Chatbot/>
    </main>
  );
};

export default Main;