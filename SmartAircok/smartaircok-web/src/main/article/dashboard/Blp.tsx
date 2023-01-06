import React, { useState, useEffect } from 'react';

import { BlpProps, GeojsonProps } from '@/items/Interfaces'

// import blp from './blp.png'
import { ReactComponent as Pickerico } from '../../../img/picker.svg'

const Blp = ({picker} : BlpProps) => { 
  const [mymapsize, setmymapsize] = useState<number[]>([1, 1])
  
  useEffect(() => {
    const myqs : Element = document.getElementById('dashboard-body-map-container')!
		const myqsstyle = getComputedStyle(myqs, '')

		const testw = (myqs.clientWidth - parseInt(myqsstyle.paddingLeft) - parseInt(myqsstyle.paddingRight) - 2) * 0.98
		const testh = (myqs.clientHeight - parseInt(myqsstyle.paddingTop) - parseInt(myqsstyle.paddingBottom) - 2) * 0.98

		setmymapsize([testw / testmapsize[0], testh / testmapsize[1]])
  },[])

  // const testmap : GeoJSON.Feature = {
  //   type : "Feature",
  //   geometry : 
  //     {
  //       type : "MultiPolygon",
  //       coordinates : [
  //         [
  //           [[0,0],[400,0],[400,100],[500,100],[500,400],[0,400],[0,0]]
  //         ],
  //         [
  //           [[300,0],[400,0],[400,100],[300,100],[300,0]],
  //           [[0,300],[400,300],[400,400],[0,400],[0,300]]
  //         ]
  //       ]
  //     },
  //   properties : {}
  // }

  const testmap : GeojsonProps= {
    "type" : "Feature",
    "geometry" : 
      {
        "type" : "MultiPolygon",
        "coordinates" : [
          [
            [[0,0],[400,0],[400,100],[500,100],[500,400],[0,400],[0,0]]
          ],
          [
            [[300,0],[400,0],[400,100],[300,100],[300,0]],
            [[0,300],[400,300],[400,400],[0,400],[0,300]]
          ]
        ]
      }
  }

  const testmapsize = [500, 400]


  const testpickerpos = [
    {
      'sn' : '2211IL0009',
      'x' : 100,
      'y' : 100
    },
    {
      'sn' : '2211IL0010',
      'x' : 150,
      'y' : 350
    },
    {
      'sn' : '2211IL0011',
      'x' : 450,
      'y' : 300
    }
  ]

	const geojson2svg = (geojson : GeojsonProps, size : number[]) => {
		return (
			<svg className='map-blp' id='map-blp' style={{width:size[0] * mymapsize[0], height:size[1] * mymapsize[1]}}>
				{geojson.geometry.coordinates.map((coordinate) => {
						return (coordinate.map((poses) => {
							const polypath : any[] = []
							{poses.map((pos, key) => {								
								polypath.push((key===0?'M':'L') + pos[0] * mymapsize[0] + ' ' + pos[1] * mymapsize[1])
							})}
							polypath.push('Z')

							return (
								<path d={polypath.join('')} fill='none' stroke='black'/>
								// <polyline points={polypath.join(' ')} style={{fill:'none', stroke:'#000000', strokeWidth:'3'}} />
							)
						}))
					})
				}
			</svg>
		)
	}

  return (
    <>
      {geojson2svg(testmap, testmapsize)}
      {testpickerpos.map((val, key) => {
        return (picker===key) ? 
          <Pickerico fill='' 
            className='map-picker-chk'
            id='map-picker-chk'
            key={key} 
            style={{
              position:'absolute',
              width:picker===key ? '48px' : '24px',
              height:picker===key ? '48px' : '24px',
              top:picker===key ? val.y * mymapsize[1] - 24 : val.y * mymapsize[1],
              left:picker===key ? val.x * mymapsize[0] - 12 : val.x * mymapsize[0]}}
          /> : 
          <svg className='map-picker' key={key} style={{position:'absolute', width:'10', height:'10', top:val.y * mymapsize[1] + 12, left:val.x * mymapsize[0] + 6}}>
            <circle cx='5' cy='5' r='5'/>
          </svg>
      })}
    </>
  );
};

export default Blp;