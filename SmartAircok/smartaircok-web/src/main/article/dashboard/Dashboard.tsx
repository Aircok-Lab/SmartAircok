import React from 'react'

import './Dashboard.css'

const Dashboard = () => {

  var rows = [], i = 0, len = 100;
  while (++i <= len) rows.push(i);

  return (
		<section className='dashboard-section1'>
			{rows.map(function (key) {
				return (<div key={key}> dashboard </div>);
			})}
		</section>
  );
}

export default Dashboard;