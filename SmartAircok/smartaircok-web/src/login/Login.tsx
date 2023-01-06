import React, { useState } from 'react'
import { useInterval } from 'use-interval'
import { useDispatch } from 'react-redux';
// import { act_login } from '../items/ActLogin';

// import apis from '../api/APIs'

import { LoginProps } from '../items/Interfaces';

import './Login.css'

const Login = () => {
  const [user, setUser] = useState<LoginProps>({id : '', pw : ''});
  const [errMsg, setErrMsg] = useState<string>('');

  const dispatch = useDispatch();

  // const login = (adminVal : boolean, refreshVal : string) => {
  //   dispatch(act_login(adminVal, refreshVal));
  // };

  //  5초간 에러메세지 출력
  const errMsgCnt : number = 5000;
  useInterval(() => {
      setErrMsg('');
      }, errMsgCnt
  );

  const loginHandler = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "SAGA_LOGIN", data : user });

    // const loginHandlerAPI = () => {
    //   return new Promise( resolve => {
    //     const res = apis.loginAPI(user);
    //     resolve(res);
    //   })
    // }

    // loginHandlerAPI().then((res : any) => {
    //   if(res){
    //     if(res.data.result === 'success'){
    //       login(res.data.admin, res.data.refresh_token);
    //       // document.location.href = '/main';
    //     }
    //     else{
    //       setErrMsg('계정을 확인해주세요.');
    //     }
    //   }
    //   else{
    //     setErrMsg('서버에 연결할 수 없습니다.');
    //   }
    // })
    // .catch((reg : any) => {
    //   console.log(reg)
    //   setErrMsg('로그인에 문제가 발생했습니다.')
    // })
  }
  
  return (
    <section className='login'>
      <form className='loginForm' onSubmit={(e) => loginHandler(e)}>
        <section className='login-container'>
          <article className='login-container-title'> Smart Aircok </article>
                    
          <article className='errMessage'>
              {errMsg}
          </article>

          <article className='login-container-input'>
            <div className='login-container-input-title'> 로그인 </div>

            <section className='login-container-idinput'>
              <label htmlFor='loginID'> 아이디 </label>
              <input
                type='text'
                name='loginID' 
                placeholder='ID'
                onChange={(e) => setUser({...user, id : e.target.value})}
                value={ user.id }
              />
            </section>
            
            <section className='login-container-pwinput'>
              <label htmlFor='loginPW'> 비밀번호 </label>
              <input 
                type='password' 
                name='loginPW'
                placeholder='Password'
                onChange={(e) => setUser({...user, pw : e.target.value})}
                value={ user.pw }
              />
            </section>

            <input className='login-container-submit' type='submit' value='LOGIN'/>
          </article>
        </section>
      </form>
    </section>
  );
}

export default Login;