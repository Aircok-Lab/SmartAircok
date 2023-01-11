import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '@/items/RootReducer'

import Blp from './Blp'

import { LastDatasProps } from '@/items/Interfaces'

import LatestLists from './comp/LatestLists'
import LatestDetails from './comp/LatestDetails'

import './Dashboard.css'

const Dashboard = () => {
	const [picker, setpicker] = useState<number>(0)

	const latestdatas : LastDatasProps[] = useSelector((state : RootState) => state.actLatests.latests).filter((lastest) => !(lastest.comm_badn || lastest.sensor_badn || lastest.power_badn || lastest.power_st))

  return (
		<section className='dashboard-container'>
			<section className='dashboard-title'>
				<p className='dashboard-title-main'> Aircok Dashboard </p>
				<p className='dashboard-title-time'> {new Date().toLocaleString()} </p>
			</section>

			<section className='dashboard-body-data'>
				<LatestLists latestdatas={latestdatas} picker={picker} setpicker={setpicker}/>
			</section>

			<section className='dashboard-body-map'>
				<p className='dashboard-body-map-title'> {latestdatas[picker].dvc_mng_nm}</p>
				<section className='dashboard-body-map-container' id='dashboard-body-map-container'>
					<Blp picker={picker}/>
				</section>
			</section>

			<section className='dashboard-body-detail'>
				<LatestDetails latestdata={latestdatas[picker]}/>
			</section>
		</section>
  )
}

export default Dashboard