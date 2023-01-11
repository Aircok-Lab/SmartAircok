import React, { useState } from 'react'

import { useSelector } from 'react-redux';
import { RootState } from '@/items/RootReducer';

import Search from '../../../../components/Search'

import { MonitoringDeviceProps } from '../../../../items/Interfaces';

import { dvcstateseq } from '../../../../items/ItemSequences'

import { ReactComponent as Circleico } from '../../../../img/circle.svg';

import './Device.css'

const Device = ({ dvclists, searchlists, setsearchlists, monitoringDvcClick } : MonitoringDeviceProps) => {
	const _datas = useSelector((state : RootState) => state.actLatests.latests).map((val) => {
		return {
			name : val.dvc_mng_nm,
			sn : val.sn,
			time : val.data_reg_dt,
			cg : !(val.comm_badn || val.sensor_badn || val.power_badn || val.power_st),
			cbc : val.comm_badn,
			cbs : val.sensor_badn,
			cbp : val.power_badn,
			cbo : !val.power_st,
		}
	})

	const datas_filter : any = (tag : string, islen : boolean) => {
		switch(tag){
			case 'all' :
				return islen ? _datas.length : _datas
			case 'cg' : 
				return islen ? _datas.filter((val) => val.cg === true).length : _datas.filter((val) => val.cg === true)
			case 'cb' :
				return islen ? _datas.filter((val) => val.cg === false).length : _datas.filter((val) => val.cg === false)
			case 'cbc' :
				return islen ? _datas.filter((val) => val.cbc === true).length : _datas.filter((val) => val.cbc === true)
			case 'cbs' :
				return islen ? _datas.filter((val) => val.cbs === true).length : _datas.filter((val) => val.cbs === true)
			case 'cbp' :
				return islen ? _datas.filter((val) => val.cbp === true).length : _datas.filter((val) => val.cbp === true)
			case 'cbo' :
				return islen ? _datas.filter((val) => val.cbo === false).length : _datas.filter((val) => val.cbo === false)
			default :
				return 0
		}
	}

	// 장비 상태 선택 state
	const [dvsstatechk, setdvcstatechk] = useState<string>(dvcstateseq[0].val)

	// const [dvclists, setdvclists] = useState<string[][]>([..._datas.map((_data) => {return [_data.sn, _data.name]})])
	const [dvcselect, setdvcselect] = useState<string>(_datas[0].sn)

  return (
		<section className='device-body'>
			<p className='device-title'> 장비 모니터링 </p>

			<section className='device-states'>
				{dvcstateseq.map((seq, key) => {
					return (
						<section className='device-state' 
							key={key}
							style={{
								borderBottom : (dvsstatechk.includes(seq.val)) ? ('3px solid ' + seq.color) : '3px solid #dddddd',
								marginRight : (key < 2) ? '2%' : '',
								width : (key < 3) ? '12%' : '8%',
								borderTopRightRadius : (key < 2) || key === 6 ? '7px' : '',
								borderTopLeftRadius : (key < 3) ? '7px' : ''
							}}
							onClick={() => setdvcstatechk(seq.val)}>
							<p className='device-state-title'> {seq.label} </p>
							<p className='device-state-val'> {datas_filter(seq.val, true)} </p>
						</section>
					)
				})}
			</section>

			<section className='device-search'>
				<Search cname={'device-search-val'} lists={dvclists} listopt={1} setFunc={setsearchlists}/>
			</section>

			<ul className='device-ul'>
				{searchlists.map((dvclist, key) => {
					return (
						<li className='device-li' key={key} 
							style={{borderColor:(dvcselect === dvclist[0])?'blue':'white'}}
							onClick={() => {setdvcselect(dvclist[0]); setdvcstatechk(dvcstateseq[0].val)}}>
							{dvclist[1]}
							{/* { _datas.filter((param) => param.sn === dvclist)[0].name } */}
						</li>	
					)
				})}
			</ul>

			{datas_filter(dvsstatechk, false).length > 0 ?
				<>
					<section className='device-infoindexes'>
						<p className='device-infoindex'> 장비명 </p>
						<p className='device-infoindex' style={{width:'20%'}}> 마지막 수신 시간 </p>
						<p className='device-infoindex'> 연결 상태 </p>
					</section>
		
					<section className='device-infos'>
						{datas_filter(dvsstatechk, false).map((val : any, key : number) => {
							return (
								<section className='device-info' key={key} style={{borderColor:(dvcselect === val.sn)?'blue':''}} onClick={() => monitoringDvcClick(val.sn)}>
									<p className='device-info-name'> {val.name} </p>
									<p className='device-info-time'> {new Date(val.time).toLocaleString()} </p>
									<p className='device-info-sensors'> <Circleico fill={val.cbc ? '#a0a0a0' : 'green'}/> </p>
									<p className='device-info-sensors'> <Circleico fill={val.cbs ? '#a0a0a0' : 'green'}/> </p>
									<p className='device-info-sensors'> <Circleico fill={val.cbp ? '#a0a0a0' : 'green'}/> </p>
									<p className='device-info-sensors'> <Circleico fill={!val.cbo ? '#a0a0a0' : 'green'}/> </p>
									<div className='device-info-state'>
										{val.cg ? 
											<> <Circleico fill='green'/> <p style={{color : 'green'}}> 수신 중 </p> </>
											: <> <Circleico fill='#a0a0a0'/> <p style={{color : '#a0a0a0'}}> 수신 실패 </p></>
										}
									</div>
								</section>
							)
						})}
					</section>
				</> : 
				<section className='device-fail'>
					<p> {dvcstateseq.filter((seq) => seq.val === dvsstatechk)[0].label} 장비가 없습니다. </p>
				</section>
			}
		</section>
  );
}

export default Device;