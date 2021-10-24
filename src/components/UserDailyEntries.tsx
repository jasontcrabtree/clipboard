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
function UserDailyEntries({ userId }: DailyEntryProps): JSX.Element {
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
            headache: has_headache
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
    <ul className="flex flex-col gap-4 mb-4">
      {entry?.map((entryData) => {
        // console.log(entryData);
        return (
          <li
            className="p-4 border rounded-lg shadow-xl card-colours border-indigo-200 bg-white text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
            key={entryData?.id}
          >
            <div className="flex flex-row gap-2 items-center">
              <span className="font-semibold opacity-90 dark:text-blue-400 text-blue-900">
                {formatDate(entryData.day)}
              </span>
              <Link href={`/entry/${entryData.id}`}>
                <a className="ml-auto p-2">
                  <HiOutlineArrowRight />
                </a>
              </Link>
            </div>
            <h3 className="font-semibold">{entryData.daySummary}</h3>
            {entryData?.entryJoinSymptoms.map((entryData) => {
              const entrySymptoms = entryData.entrySymptoms[0];
              return (
                <div key={entrySymptoms.id} className="flex gap-2 flex-wrap">
                  {entrySymptoms.headache ? (
                    <SymptomsResult
                      label="Headache"
                      present={entrySymptoms.headache}
                    />
                  ) : (
                    <SymptomsResult
                      label="No Headache"
                      present={entrySymptoms.headache}
                    />
                  )}
                  {entrySymptoms.tired ? (
                    <SymptomsResult
                      label="Tired"
                      present={entrySymptoms.tired}
                    />
                  ) : (
                    <SymptomsResult
                      label="Not Tired"
                      present={entrySymptoms.tired}
                    />
                  )}
                  {entrySymptoms.soreNeck ? (
                    <SymptomsResult
                      label="Sore Neck"
                      present={entrySymptoms.soreNeck}
                    />
                  ) : (
                    <SymptomsResult
                      label="No Sore Neck"
                      present={entrySymptoms.soreNeck}
                    />
                  )}
                  {entrySymptoms.digestion ? (
                    <SymptomsResult
                      label="Digestive Issues"
                      present={entrySymptoms.digestion}
                    />
                  ) : (
                    <SymptomsResult
                      label="Normal Digestion"
                      present={entrySymptoms.digestion}
                    />
                  )}
                  {entrySymptoms.soreStomach ? (
                    <SymptomsResult
                      label="Sore Stomach"
                      present={entrySymptoms.soreStomach}
                    />
                  ) : (
                    <SymptomsResult
                      label="Normal Stomach"
                      present={entrySymptoms.soreStomach}
                    />
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
