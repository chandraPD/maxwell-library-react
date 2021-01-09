import React, { useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { addDays } from 'date-fns';

function Dates(e) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChangeStart = dates => {
    e.startDateCallback(moment(dates, 'dd-MMM-yyyy hh:mm:ss'));
    setStartDate(dates);
  };

  const onChangeEnd = dates => {
    e.endDateCallBack(moment(dates, 'dd-MMM-yyyy hh:mm:ss'));
    setEndDate(dates);
  }
  return (

    <>
      <DatePicker
        selected={startDate}
        onChange={onChangeStart}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        maxDate={addDays(new Date(), 5)}
        timeInputLabel="Time:"
        placeholderText="Select a date between today and 5 days in the future"
        showTimeInput
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <DatePicker
        selected={endDate}
        onChange={onChangeEnd}
        endDate={endDate}
        minDate={startDate}
        maxDate={addDays(new Date(), 5)}
        timeInputLabel="Time:"
        placeholderText="Select a date between today and 5 days in the future"
        showTimeInput
        dateFormat="MMMM d, yyyy h:mm aa"
        selectsEnd
      />
    </>
  )
}

export default Dates