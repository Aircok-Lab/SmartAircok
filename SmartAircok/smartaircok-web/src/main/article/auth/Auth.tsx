import React from 'react'

import './Auth.css'

const Auth = () => {

  var rows = [], i = 0, len = 100;
  while (++i <= len) rows.push(i);

  return (
    <>
      <section className='auth-section1'>
        {rows.map(function (key) {
          return (<div key={key}> auth </div>);
        })}
      </section>
    </>
  );
}

export default Auth;