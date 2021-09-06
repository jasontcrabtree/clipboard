import useSWR from 'swr';
import { fetcher } from '../lib/utils';

type DailyEntryProps = {
  userId: string;
};

const formatDate = function (timestamp) {
  // Create a date object from the timestamp
  const date = new Date(timestamp);

  // Create a list of names for the months
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // return a formatted date
  return months[date.getMonth()];
};

/**
 *
 * @returns {function} JSX Component
 */
function UserDailyEntries({ userId = '123' }: DailyEntryProps): JSX.Element {
  // This is probably incorrect. Because we are using API routes to securely access data (via the fetcher function), and I don't want to change the graphql endpoint for each function, we need to change the query client side, not pass in variables, for SWR, I guess? This is the only way I can get it to work for SWR at least.

  const { data, error } = useSWR(
    `query DailyEntriesByUser {
      daily_entries(where: {user_id: {_eq: "${userId}"}}, order_by: {created_at: desc}) {
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

  if (error) {
    console.warn(error);
    return <div>Failed to load due to error {error}</div>;
  }

  if (!data) return <div className="text-gray-200">Loading</div>;

  const entry = data.daily_entries;

  console.log(formatDate('2018-07-04 05:00:00'));

  return (
    <ul className="flex flex-col gap-4 mb-4 text-gray-400">
      {entry?.map((entryData) => {
        console.log(entryData);
        console.log(formatDate(entryData.created_at));
        return (
          <li
            className="p-2 border border-gray-800 bg-gray-900 rounded shadow-xl"
            key={entryData?.id}
          >
            <span className="font-semibold opacity-40 text-blue-500">
              {formatDate(entryData.created_at)}
            </span>
            <h3 className="font-semibold">{entryData.day_summary}</h3>
            {entryData?.daily_entries_has_join_to_symptoms.map((entryData) => {
              const entrySymptoms =
                entryData.daily_entries_symptoms_join_table_symptoms[0];
              // console.log(entrySymptoms);

              // Given entrySymptioms
              // Return a list of symptoms in a nice way
              // List to pass in (entrySymptoms)
              // Fleible span/div to display data
              return (
                <div key={entrySymptoms.id} className="flex gap-2 flex-wrap">
                  {entrySymptoms.has_tired ? (
                    <span className="text-pink-700 text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded p-1">
                      Tired
                    </span>
                  ) : (
                    <span className="text-purple-500 text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded p-1">
                      Not tired
                    </span>
                  )}
                  {entrySymptoms.has_headachie ? (
                    <span className="text-pink-700 text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded p-1">
                      Headache
                    </span>
                  ) : (
                    <span className="text-purple-500 text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded p-1">
                      No Headache
                    </span>
                  )}
                  {entrySymptoms.has_digestive_issues ? (
                    <span className="text-pink-700 text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded p-1">
                      Digestive Issues
                    </span>
                  ) : (
                    <span className="text-purple-500 text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded p-1">
                      Normal Digestion
                    </span>
                  )}
                  {entrySymptoms.has_sore_stomach ? (
                    <span className="text-pink-700 text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded p-1">
                      Sore Stomach
                    </span>
                  ) : (
                    <span className="text-purple-500 text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded p-1">
                      Normal Stomach
                    </span>
                  )}
                </div>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
}

export default UserDailyEntries;
