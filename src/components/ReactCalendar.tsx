import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// eslint-disable-next-line require-jsdoc
function ReactCalendar(): JSX.Element {
  const [value, onChange] = useState(new Date());

  console.log(value);

  return (
    <div>
      <div>{value.toLocaleDateString()}</div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default ReactCalendar;
