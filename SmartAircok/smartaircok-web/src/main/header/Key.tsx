import React, { useState, useEffect } from 'react';

import apis from '../../api/APIs'

const Key = () => {
  const myTime : number = 600; //second

  const [isgen, setIsgen] = useState<boolean>(false);
  const [hashkey, setHashkey] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(myTime);
  
  // let timeoutId: NodeJS.Timeout;
  // timeoutId = setTimeout(() => {}, 1000);
  // window.clearTimeout(timeoutId);
  
  // //setInterval
  // let intervalId: NodeJS.Timeout;
  // intervalId = setInterval(() => {}, 1000);
  // window.clearInterval(intervalId);

  function timer(){
    const mm = Math.floor(seconds / 60)
    const ss = seconds % 60

    return (mm >= 10 ? mm : '0'.concat(mm.toString())) + ' : ' + (ss >= 10 ? ss : '0'.concat(ss.toString()))
  }

  useEffect(() => {
    if(isgen){
      const interval = setInterval(() => {
          if (seconds === 0) {
            apis.hashkeyAPI(0).then((props) => {
              if(props?.status === 200){
                setHashkey(props?.data.key)
                setIsgen(false)
              }
            })
            clearInterval(interval)
          }
          else {
            setSeconds(seconds - 1);
          }
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => {
      setSeconds(myTime)
    }
    // const interval = setInterval(() => {
    //     if (seconds === 0) clearInterval(interval);
    //     else setSeconds(seconds - 1);
    // }, 1000);
    // return () => clearInterval(interval);
  })

  return (
    isgen ? 
    <section className='timer'> 
      <p> {hashkey} </p>
      <p> {timer()} </p>
    </section> : 
    <input type='button' className='header-userinfo-key' 
      value='Generate Key'
      onClick={() => {
        apis.hashkeyAPI(1).then((props) => {
          if(props?.status === 200){
            setHashkey(props?.data.key)
            setIsgen(true)
          }
        })
      }}
    />
  );
};

export default Key;