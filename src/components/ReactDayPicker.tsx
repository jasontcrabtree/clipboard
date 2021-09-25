import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import DailyEntryByDate from './DailyEntryByDate';
import 'react-day-picker/style.css';

// eslint-disable-next-line require-jsdoc
export default function Example(): JSX.Element {
  const [selected, setSelected] = useState<Date | undefined>();

  const footer = selected
    ? `You selected ${selected.toLocaleDateString()}.`
    : 'Please pick a day.';

  const selectedDay = selected ? selected.toLocaleDateString() : `Pick a day`;

  // const disabledDays = [
  //   new Date(2021, 9, 8), // 8th Sept, 2021
  //   new Date(2021, 9, 10), // 10th Sept, 2021
  // ];

  const disabledDays = [
    new Date(2021, 9, 10),
    new Date(2021, 9, 12),
    new Date(2021, 9, 20),
    { from: new Date(2021, 9, 18), to: new Date(2021, 9, 29) },
  ];

  // eslint-disable-next-line require-jsdoc
  // function isDayDisabled(day) {
  //   return !disabledDays.some((disabledDay) =>
  //     // DateUtils.isSameDay(day, disabledDay),
  //     // (day1: day, day2: disabledDay) => boolean;
  //     console.log(disabledDay),
  //   );
  // }

  return (
    <div>
      {selected ? (
        <DailyEntryByDate day={selectedDay} />
      ) : (
        <div>Select a day</div>
      )}
      <DayPicker
        mode="single"
        defaultMonth={new Date()}
        onSelect={setSelected}
        // footer={footer}
        disabled={disabledDays}
      />
      {/* <DailyEntryByDate day={'2021-09-08'} /> */}
    </div>
  );
}
