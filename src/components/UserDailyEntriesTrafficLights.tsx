import { HiOutlineArrowRight } from 'react-icons/hi';
import useSWR from 'swr';
import { fetcher, formatDate } from '../lib/utils';
import SymptomsResult from './SymptomsResult';
import Link from 'next/link';

type DailyEntryProps = {
  userId: string;
};

/**
 *
 * @returns {function} JSX Component
 */
function UserDailyEntriesTrafficLights({
  userId,
}: DailyEntryProps): JSX.Element {
  // This is probably incorrect. Because we are using API routes to securely access data (via the fetcher function), and I don't want to change the graphql endpoint for each function, we need to change the query client side, not pass in variables, for SWR, I guess? This is the only way I can get it to work for SWR at least.

  const { data, error } = useSWR(
    `query DailyEntriesByUser {
      daily_entries(where: {user_id: {_eq: "${userId}"}}, order_by: {day: desc}) {
        id
        created: created_at
        day
        daySummary: day_summary
        entryJoinSymptoms: daily_entries_has_join_to_symptoms {
          entrySymptoms: daily_entries_symptoms_join_table_symptoms {
            id
            created: created_at
            digestion: has_digestive_issues
            headache: has_headachie
            soreNeck: has_sore_neck
            soreStomach: has_sore_stomach
            tired: has_tired
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

  if (!data) return <div>Loading</div>;

  const entry = data.daily_entries;

  if (!entry) return <div>Log in</div>;

  return (
    <ul className="flex flex-col gap-0 mb-4 text-gray-400">
      {entry?.map((entryData) => {
        console.log(entryData);
        return (
          <li
            className="px-2 border border-gray-800 bg-gray-900 rounded shadow-xl flex flex-row"
            key={entryData?.id}
          >
            <div className="flex flex-row gap-2 items-center">
              <span className="font-semibold opacity-40 text-blue-400">
                {formatDate(entryData.day)}
              </span>
              {entryData?.entryJoinSymptoms.map((entryData) => {
                const entrySymptoms = entryData.entrySymptoms[0];
                return (
                  <div key={entrySymptoms.id} className="flex gap-2 flex-wrap">
                    {entrySymptoms.tired ? (
                      // <SymptomsResult
                      //   label="Tired"
                      //   present={entrySymptoms.tired}
                      // />
                      <div className="bg-red-700 w-6 h-6 flex items-center justify-center font-bold text-red-200">
                        1
                      </div>
                    ) : (
                      // <SymptomsResult
                      //   label="Not Tired"
                      //   present={entrySymptoms.tired}
                      // />
                      <div className="bg-blue-900 w-6 h-6 flex items-center justify-center font-bold text-blue-200">
                        0
                      </div>
                    )}
                  </div>
                );
              })}
              {/* <Link href={`/entry/${entryData.id}`}>
                <a className="ml-auto p-2">
                  <HiOutlineArrowRight />
                </a>
              </Link> */}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default UserDailyEntriesTrafficLights;
