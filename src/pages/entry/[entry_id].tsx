import { useRouter } from 'next/dist/client/router';
import DailyEntryById from '../../components/DailyEntryById';

/**
 * Dashboard page JSX. Each component has it's own self contained logic.
 * @returns {function} JSX Stateless Component
 */
export default function Entry(): JSX.Element {
  // Use the useRouter hook
  const router = useRouter();

  console.log(router);

  // Grab our ID parameter
  const { entry_id } = router.query;

  console.log(entry_id);

  return (
    <section className="flex flex-col w-full gap-8">
      <h1 className="font-bold text-4xl text-center text-blue-400 pt-8 pb-2 mb-8">
        Entry
      </h1>
      <DailyEntryById entryId={entry_id} />
    </section>
  );
}
