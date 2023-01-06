import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/items/RootReducer';

import alarmico from '../../img/alarm.svg';
import userico from '../../img/user.svg';
import { ReactComponent as Arrowico } from '../../img/arrow.svg';

import './Header.css'

const Header = () => {
  const [userinfo, setuserinfo] = useState<boolean>(false);

  const dispatch = useDispatch();

  return (
    <header className='aircok-header'>
      <div className='header-logo'>
        LOGO
      </div>

      <div className='header-user'>
        <img src={ alarmico } className='header-alarm' alt='arlarm-btn'/>
        <img src={ userico } className='user-icon' alt='user-icon'/>
        <div className='user-id'> 
          {useSelector((state : RootState) => state.actLogin.user)} 
        </div>

        <Arrowico className='header-userinfo-exp' fill='black' transform={userinfo ? 'rotate(90)' : 'rotate(270)'} onClick={() => setuserinfo(!userinfo)}/>

        {userinfo ? 
          <section className='header-userinfo'>
            <button className='header-userinfo-logout' 
              onClick={() => dispatch({ type: "SAGA_LOGOUT" })}/>
          </section> 
          : <></>
        }
      </div>
    </header>
  );
};

export default Header;