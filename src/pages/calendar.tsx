import ReactCalendar from '../components/ReactCalendar';
import ReactDayPicker from '../components/ReactDayPicker';

/**
 * Dashboard page JSX. Each component has it's own self contained logic.
 * @returns {function} JSX Stateless Component
 */
export default function Home(): JSX.Element {
  return (
    <section className="flex flex-col w-full gap-8">
      <h1 className="font-bold text-4xl text-center text-blue-400 pt-8 pb-2 mb-8">
        All Entries
      </h1>
      <div className="border border-gray-700 rounded">
        <h2>React Day Picker</h2>
        <ReactDayPicker />
      </div>
      <div className="border border-gray-700 rounded">
        React Calendar
        <ReactCalendar />
      </div>
    </section>
  );
}
