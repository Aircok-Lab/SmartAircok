import React from 'react';

import Calendar from './Calendar'

import { DatePickerProps } from '../items/Interfaces'

import './DatePicker.css'

const DatePicker = ({startDate, setStartDate, endDate, setEndDate} : DatePickerProps) => {
  return (
    <section className='datepicker'>
      <Calendar sdate={startDate} edate={endDate} type={'s'} setDate={setStartDate}/>
       ~
      <Calendar sdate={startDate} edate={endDate} type={'e'} setDate={setEndDate}/>
    </section>
  );
};

export default DatePicker;