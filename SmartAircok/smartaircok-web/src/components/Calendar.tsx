import React from 'react';

import DatePicker from 'react-datepicker'

import { CalendarProps } from '../items/Interfaces'

import 'react-datepicker/dist/react-datepicker.css'

const Calendar = ({sdate, edate, type, setDate} : CalendarProps) => {
  return (
    <DatePicker 
      dateFormat="yyyy/MM/dd"
      selected={(type==='s')?sdate:edate}
      excludeDateIntervals={(type==='s')?[{start:edate, end:new Date(9999, 11, 31)}]:[{start:new Date(0), end:sdate}]}
      onChange={(date : Date) => setDate(date)}
    />
  )
}

export default Calendar;