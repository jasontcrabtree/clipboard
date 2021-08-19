import PrimaryNav from '../components/PrimaryNav';
import DailyEntry from '../components/DailyEntry';
import SimpleForm from '../components/SimpleForm';
import SmartForm from '../components/SmartForm';

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
      {/* <DailyEntry /> */}
      <SmartForm />
    </main>
  );
}
