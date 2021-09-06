import useSWR from 'swr';
import { fetcher } from '../lib/utils';

type DailyEntryProps = {};

/**
 *
 * @returns {function} JSX Component
 */
function AllEntries(): JSX.Element {
  // This is probably incorrect. Because we are using API routes to securely access data (via the fetcher function), and I don't want to change the graphql endpoint for each function, we need to change the query client side, not pass in variables, for SWR, I guess? This is the only way I can get it to work for SWR at least.
  const { data, error } = useSWR(
    `query AllDailyEntries {
      daily_entries {
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

  const entry = data.daily_entries;

  return (
    <ul className="flex flex-col gap-4 mb-4">
      {entry?.map((item) => (
        <li
          className="p-2 border border-gray-200 bg-white rounded shadow-md"
          key={item?.id}
        >
          <h3 className="font-semibold">{item.day_summary}</h3>
        </li>
      ))}
    </ul>
  );
}

export default AllEntries;
