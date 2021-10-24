import useSWR from 'swr';
import { fetcher, formatDate } from '../lib/utils';
import SymptomsResult from './SymptomsResult';

type DailyEntryProps = {
  entryId: any;
};

/**
 *
 * @returns {function} JSX Component
 */
function DailyEntryById({ entryId }: DailyEntryProps): JSX.Element {
  const { data, error } = useSWR(
    entryId
      ? `query DailyEntryById($id: uuid) {
        daily_entries(where: {id: {_eq: "${entryId}"}}) {
          id
          created: created_at
          summary: day_summary
          entryJoinSymptoms: daily_entries_has_join_to_symptoms {
            entrySymptoms: daily_entries_symptoms_join_table_symptoms {
              id
              created: created_at
              digestive: has_digestive_issues
              headache: has_headache
              neck: has_sore_neck
              stomach: has_sore_stomach
              tired: has_tired
            }
          }
        }
      }`
      : null,
    fetcher,
  );

  if (error) {
    console.warn(error);
    return <div>Failed to load due to error {error}</div>;
  }

  if (!data) return <div>Loading</div>;

  const entry = data?.daily_entries[0];

  if (!entry) return <div>Log in</div>;

  console.log(entry);

  return (
    <div key={entry.id}>
      <span className="block text-sm">{formatDate(entry.created)}</span>
      <h2>{entry.summary}</h2>
      <div>
        {entry?.entryJoinSymptoms.map((entryData) => {
          console.log(entryData);
          const entrySymptoms = entryData.entrySymptoms[0];
          return (
            <div key={entrySymptoms.id} className="flex gap-2 flex-wrap">
              {entrySymptoms.tired ? (
                <SymptomsResult label="Tired" present={entrySymptoms.tired} />
              ) : (
                <SymptomsResult
                  label="Not Tired"
                  present={entrySymptoms.tired}
                />
              )}
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
      </div>
    </div>
    // <ul className="flex flex-col gap-4 mb-4 text-gray-400">
    //   {entry?.map((entryData) => {
    //     console.log(entryData);
    //     return (
    //       <div>I'm here</div>
    //       // <li
    //       //   className="p-2 border border-gray-800 bg-gray-900 rounded shadow-xl"
    //       //   key={entryData?.id}
    //       // >
    //       //   <span className="font-semibold opacity-40 text-blue-400">
    //       //     {formatDate(entryData.day)}
    //       //   </span>
    //       //   <h3 className="font-semibold">{entryData.daySummary}</h3>
    //       // </li>
    //     );
    //   })}
    // </ul>
  );
}

export default DailyEntryById;
