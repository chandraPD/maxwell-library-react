import React, { Component, useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dates(e) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    e.startDateCallback(start);
    e.endDateCallBack(end);
    setStartDate(start);
    setEndDate(end);
  };
  
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      minDate={new Date()}
      inline
    />
  )
}

export default Dates