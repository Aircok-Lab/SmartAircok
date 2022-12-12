import React from 'react'

import './Org.css'

const Org = () => {

  var rows = [], i = 0, len = 100;
  while (++i <= len) rows.push(i);

  return (
    <>
      <section className='org-section1'>
        {rows.map(function (key) {
        return (<div key={key}> org </div>);
        })}
      </section>
    </>
  );
}

export default Org;