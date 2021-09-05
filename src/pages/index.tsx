import UserDailyEntries from '../components/UserDailyEntries';

/**
 * Homepage component, shows HTML on the index page. Each component has it's own self contained logic.
 * @returns {function} JSX Stateless Component
 */
export default function Home(): JSX.Element {
  return (
    <section className="flex flex-col w-full gap-8">
      <h1 className="font-bold text-4xl text-center pt-8 pb-2 mb-8">
        Clipboard
      </h1>
      {/* <AllDailyEntries limit={3} /> */}
      <UserDailyEntries userId={'2feb2bef-48f0-41f9-aff1-34314eab7369'} />
    </section>
  );
}
