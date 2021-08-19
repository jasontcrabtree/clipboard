import PrimaryNav from '../components/PrimaryNav';
import DailyEntry from '../components/DailyEntry';
import SimpleForm from '../components/SimpleForm';
import SmartForm from '../components/SmartForm';
import AllDailyEntries from '../components/AllDailyEntries';

/**
 *
 * @returns {function} JSX Stateless Component
 */
export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <PrimaryNav />
      <h1 className="font-bold text-4xl text-center pt-24 pb-2 mb-8">
        Clipboard
      </h1>
      <hr className="mb-6 border-b-1 border-gray-400 w-3/5 mx-auto" />
      <AllDailyEntries />
      <hr className="mb-6 border-b-1 border-gray-400 w-3/5 mx-auto" />
      {/* <DailyEntry /> */}
      <SmartForm />
    </main>
  );
}
