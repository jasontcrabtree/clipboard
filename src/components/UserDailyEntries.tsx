import useSWR from 'swr';
import { fetcher } from '../lib/utils';

type DailyEntryProps = {
  userId: string;
};

/**
 *
 * @returns {function} JSX Component
 */
function UserDailyEntries({ userId }: DailyEntryProps): JSX.Element {
  // This is probably incorrect. Because we are using API routes to securely access data (via the fetcher function), and I don't want to change the graphql endpoint for each function, we need to change the query client side, not pass in variables, for SWR, I guess? This is the only way I can get it to work for SWR at least.
  const { data, error } = useSWR(
    `query DailyEntriesByUser {
      daily_entries(where: {user_id: {_eq: ${userId}}}) {
        id
        created_at
        day_summary
        daily_entries_has_join_to_symptoms {
          daily_entries_symptoms_join_table_symptoms {
            id
            created_at
            has_digestive_issues
            has_headachie
            has_sore_neck
            has_sore_stomach
            has_tired
          }
        }
      }
    }`,
    fetcher,
  );

  console.log(data);

  if (error) {
    console.warn(error);
    return <div>Failed to load due to error {error}</div>;
  }

  if (!data) return <div>Loading</div>;

  return (
    // <ul className="flex flex-col gap-4 mb-4">
    //   {data?.daily_entries?.map((entry) => (
    //     <li
    //       className="p-2 border border-gray-200 bg-white rounded shadow-md"
    //       key={entry?.id}
    //     >
    //       hey
    //       {/* <h3 className="font-semibold">{entry.day}</h3> */}
    //     </li>
    //   ))}
    // </ul>
    <div>Hey</div>
  );
}

export default UserDailyEntries;
