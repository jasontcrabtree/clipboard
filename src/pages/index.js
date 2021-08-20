import PrimaryNav from '../components/PrimaryNav';
import DailyEntry from '../components/DailyEntry';
import SimpleForm from '../components/SimpleForm';
import SmartForm from '../components/SmartForm';
import AllDailyEntries from '../components/AllDailyEntries';
import AddNewArticle from '../components/AddNewArticle';

/**
 *
 * @returns {function} JSX Stateless Component
 */
export default function Home() {
  return (
    <section className="flex flex-col w-full gap-8">
      <h1 className="font-bold text-4xl text-center pt-8 pb-2 mb-8">
        Clipboard
      </h1>
      <AddNewArticle />
      {/* <AllDailyEntries /> */}
      {/* <DailyEntry /> */}
      {/* <SmartForm /> */}
    </section>
  );
}
