import useSWR from 'swr';
import { fetcher } from '../lib/utils';

type DailyEntryProps = {
  userId: string;
};

/**
 *
 * @returns {function} JSX Component
 */
function UserDailyEntries({ userId = '123' }: DailyEntryProps): JSX.Element {
  // This is probably incorrect. Because we are using API routes to securely access data (via the fetcher function), and I don't want to change the graphql endpoint for each function, we need to change the query client side, not pass in variables, for SWR, I guess? This is the only way I can get it to work for SWR at least.

  const { data, error } = useSWR(
    `query DailyEntriesByUser {
      daily_entries(where: {user_id: {_eq: "${userId}"}}) {
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

  // console.log(data);

  if (error) {
    console.warn(error);
    return <div>Failed to load due to error {error}</div>;
  }

  if (!data) return <div>Loading</div>;

  const entry = data.daily_entries;

  // console.log(entry);

  // console.log(
  //   typeof entry[11].daily_entries_has_join_to_symptoms[0]
  //     .daily_entries_symptoms_join_table_symptoms[0],
  // );

  entry.map((entryData) => {
    const entrySymptoms = entryData?.daily_entries_has_join_to_symptoms;

    entrySymptoms.map((symptoms) => {
      // console.log(symptoms?.daily_entries_symptoms_join_table_symptoms[0]);
    });
  });

  return (
    <ul className="flex flex-col gap-4 mb-4">
      {entry?.map((item) => (
        <li
          className="p-2 border border-gray-200 bg-white rounded shadow-md"
          key={item?.id}
        >
          <h3 className="font-semibold">{item.day_summary}</h3>
          {item?.daily_entries_has_join_to_symptoms.map((entryData) => {
            const entrySymptoms =
              entryData.daily_entries_symptoms_join_table_symptoms[0];
            console.log(entrySymptoms);
            return (
              <div key={entrySymptoms.id}>
                {entrySymptoms.has_tired ? `Tired` : null}
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  );
}

export default UserDailyEntries;
