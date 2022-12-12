import React from 'react';

import './Header.css'

const Header = () => {
  return (
    <header className='aircok-header'>
      <div className='header-icon'>
        header icon
      </div>
      <span className='header-separator'/>
      <div>
        header body
      </div>

      <div>
        &nbsp;&nbsp;&nbsp;
      </div>

      <div>
        회사 소개
      </div>

      <div>
        &nbsp;&nbsp;&nbsp;
      </div>
      <div>
        다크모드
      </div>
    </header>
  );
};

export default Header;