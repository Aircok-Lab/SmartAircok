import React from 'react';

import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { LineChartProps } from '@/items/Interfaces'

const LineChart = ({datas, sensor} : LineChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      stacked: false,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    // title: {
    //   text: title + ' Graph',
    //   align: 'left'
    // },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    // yaxis: {
    //   labels: {
    //     formatter : function (val) {
    //       return val.toFixed(0);
    //     },
    //   },
    //   title: {
    //     text: title
    //   },
    // },
    xaxis: {
      categories: [...datas.map((val) => val.data_reg_dt)],
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      x: {
        formatter : function (val) {
          return new Date(val).toLocaleDateString();
        }
      }
    }
  };

  const series = [
    {
      name : sensor,
      data : [...datas.map((val) => new Map(Object.entries(val)).get(sensor))]
    }
  ];
  
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default LineChart;