import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/items/RootReducer'

import Header from './header/Header'
import Aside from './aside/Aside'
import Article from './article/Article'
// import Chatbot from '../chatbot/Chatbot'

import Loading from './Loading'

import { asideseq } from '../items/ItemSequences'

import './Main.css'

const Main = () => {
  const [isloading, setisloading] = useState<boolean>(true)

  const [asidelistchk, setasidelistchk] = useState<string>(asideseq[0].val)

  const dispatch = useDispatch()
  const loadData = useSelector((state : RootState) => state.actLatests.latests)

  useEffect(() => {
    // dispatch({ type: "SAGA_DATAS" })
    dispatch({ type: "SAGA_LATESTS" })
  }, [])

  useEffect(() => {
    (loadData.length > 0) ? setisloading(false) : setisloading(true)
  },[loadData])

  return (
    isloading ? 
    <Loading /> : 
    <div className='Aircok'>
      <Header />
      <main className='aircok-main'>
        <Aside asidelistchk={asidelistchk} setasidelistchk={setasidelistchk}/>
        <Article asidelistchk={asidelistchk} setasidelistchk={setasidelistchk}/>
        {/* <Chatbot/> */}
      </main>
    </div>
  )
}

export default Main