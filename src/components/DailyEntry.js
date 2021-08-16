import CustomSwitch from './CustomSwitch';

function DailyEntry() {
  return (
    <form className="flex flex-col self-center gap-4 w-10/12 bg-gray-100 p-4 rounded-lg">
      <label
        className="flex flex-row gap-2 justify-center items-center"
        htmlFor="word"
      >
        Word
        <input
          className="w-full rounded-md border-gray-100 shadow-sm p-2"
          type="text"
          name="word"
          id="word"
        />
      </label>
      <label
        className="flex flex-row gap-2 justify-center items-center"
        htmlFor="date"
      >
        Date
        <input
          className="w-full rounded-md border-gray-100 shadow-sm p-2"
          type="date"
          name="date"
          id="date"
        />
      </label>
      <CustomSwitch
        switchLabel="Symptoms today?"
        id="symptoms"
        name="symptoms"
      />
      {/* {enabled ? <div>Enabled</div> : <div>Not enabled</div>} */}
    </form>
  );
}

export default DailyEntry;
