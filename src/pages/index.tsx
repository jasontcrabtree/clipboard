import { useSession } from 'next-auth/client';
import UserDailyEntries from '../components/UserDailyEntries';

/**
 * Homepage component, shows HTML on the index page. Each component has it's own self contained logic.
 * @param {object} props any any
 * @returns {function} JSX Stateless Component
 */
export default function Home(): JSX.Element {
  const [session, loading] = useSession();

  if (!session)
    return (
      <div>
        <p className="text-xl text-center font-semibold text-indigo-700">
          Please log in to view entries
        </p>
      </div>
    );

  if (loading)
    return (
      <p className="text-xl text-center font-semibold text-indigo-700">
        Entries loading
      </p>
    );

  // @ts-ignore
  const user = session?.user_id?.data?.users[0].user_id;

  return (
    <section className="flex flex-col w-full gap-8">
      <h1 className="font-bold text-4xl text-center pt-8 pb-2 mb-8 text-blue-400">
        Clipboard
      </h1>
      <UserDailyEntries userId={user} />
    </section>
  );
}
