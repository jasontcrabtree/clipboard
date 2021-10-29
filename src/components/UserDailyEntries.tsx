import { HiEye, HiOutlineArrowRight, HiSparkles } from 'react-icons/hi';
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
            headache: has_headache
            soreNeck: has_sore_neck
            soreStomach: has_sore_stomach
            tired: has_tired
            awakeDuringNight: has_awake_during_night
            badBreath: has_bad_breath
            bloated: has_bloating
            blurredVision: has_blurred_vision
            bodyAche: has_bodyache
            coldSensitivity: has_cold_sensitivity
            concentrationIssues: has_concentration_issues
            constipation: has_constipation
            crying: has_crying
            diarrhea: has_diarrhea
            distracted: has_distracted
            dizzy: has_dizzy
            emotionalEating: has_emotional_eating
            energyCrash: has_energy_crash
            extremeEnergyCrash: has_extreme_energy_crash
            gassy: has_gassy
            lightheaded: has_lightheaded
            memoryIssues: has_memory_issues
            napped: has_nap
            ovaryPain: has_ovary_pain
            overAte: has_overeating
            pms: has_pms
            poorSleep: has_poor_sleep
            runnyNose: has_runny_nose
            soreTeeth: has_sore_teeth
            soreThroat: has_sore_throat
            speakingIssues: has_speaking_issues
            tenderBreasts: has_tender_breasts
            tinnitus: has_tinnitus
            nightSweats: has_night_sweats,
            ibsReaction: has_ibs_reaction,
            consumedPainkillers: has_consumed_painkillers,
            noSymptoms: has_no_symptoms
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

  if (!data)
    return (
      <div>
        <p className="text-xl text-center text-semibold">Loading</p>
      </div>
    );

  const entry = data.daily_entries;

  if (!entry) return <div>Log in</div>;

  return (
    <ul className="flex flex-col gap-4 mb-4">
      {entry?.map((entryData) => {
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
              console.log(entrySymptoms);

              if (entryData.noSymptoms) {
                console.log('no symptoms!!!');
                return (
                  <div
                    key={entrySymptoms.id + 0}
                    className="flex gap-2 flex-wrap"
                  >
                    {entrySymptoms.noSymptoms && (
                      <>
                        hi
                        <HiSparkles size="24" />
                        <SymptomsResult
                          label="No Symptoms!"
                          present={entrySymptoms.noSymptoms}
                        />
                      </>
                    )}
                  </div>
                );
              }

              return (
                <div key={entrySymptoms.id} className="flex gap-2 flex-wrap">
                  {entrySymptoms.noSymptoms && (
                    <>
                      <HiSparkles size="24" className="text-green-400" />
                      <SymptomsResult
                        label="No Symptoms!"
                        present={!entrySymptoms.noSymptoms}
                      />
                    </>
                  )}
                  {entrySymptoms.headache && (
                    <SymptomsResult
                      label="Headache"
                      present={entrySymptoms.headache}
                    />
                  )}
                  {entrySymptoms.tired && (
                    <SymptomsResult
                      label="Tired"
                      present={entrySymptoms.tired}
                    />
                  )}
                  {entrySymptoms.soreNeck && (
                    <SymptomsResult
                      label="Sore Neck"
                      present={entrySymptoms.soreNeck}
                    />
                  )}
                  {entrySymptoms.digestion && (
                    <SymptomsResult
                      label="Digestive Issues"
                      present={entrySymptoms.digestion}
                    />
                  )}
                  {entrySymptoms.soreStomach && (
                    <SymptomsResult
                      label="Sore Stomach"
                      present={entrySymptoms.soreStomach}
                    />
                  )}
                  {entrySymptoms.awakeDuringNight && (
                    <SymptomsResult
                      label="Awake during Night"
                      present={entrySymptoms.awakeDuringNight}
                    />
                  )}
                  {entrySymptoms.badBreath && (
                    <SymptomsResult
                      label="Bad Breath"
                      present={entrySymptoms.badBreath}
                    />
                  )}
                  {entrySymptoms.bloated && (
                    <SymptomsResult
                      label="Bloated"
                      present={entrySymptoms.bloated}
                    />
                  )}
                  {entrySymptoms.blurredVision && (
                    <SymptomsResult
                      label="Blurred Vision"
                      present={entrySymptoms.blurredVision}
                    />
                  )}
                  {entrySymptoms.bodyAche && (
                    <SymptomsResult
                      label="Body Aches"
                      present={entrySymptoms.bodyAche}
                    />
                  )}
                  {entrySymptoms.coldSensitivity && (
                    <SymptomsResult
                      label="Cold Sensistivity"
                      present={entrySymptoms.coldSensitivity}
                    />
                  )}
                  {entrySymptoms.concentrationIssues && (
                    <SymptomsResult
                      label="Concentration Issues"
                      present={entrySymptoms.concentrationIssues}
                    />
                  )}
                  {entrySymptoms.constipation && (
                    <SymptomsResult
                      label="Constipation"
                      present={entrySymptoms.constipation}
                    />
                  )}
                  {entrySymptoms.crying && (
                    <SymptomsResult
                      label="Cried during Day"
                      present={entrySymptoms.crying}
                    />
                  )}
                  {entrySymptoms.diarrhea && (
                    <SymptomsResult
                      label="Had Diarrhea"
                      present={entrySymptoms.diarrhea}
                    />
                  )}
                  {entrySymptoms.distracted && (
                    <SymptomsResult
                      label="Noticeably Distracted"
                      present={entrySymptoms.distracted}
                    />
                  )}
                  {entrySymptoms.dizzy && (
                    <SymptomsResult
                      label="Noticeable dizziness"
                      present={entrySymptoms.dizzy}
                    />
                  )}
                  {entrySymptoms.emotionalEating && (
                    <SymptomsResult
                      label="Emotionally Ate during Day"
                      present={entrySymptoms.emotionalEating}
                    />
                  )}
                  {entrySymptoms.energyCrash && (
                    <SymptomsResult
                      label="Energy Crashed during Day"
                      present={entrySymptoms.energyCrash}
                    />
                  )}
                  {entrySymptoms.extremeEnergyCrash && (
                    <SymptomsResult
                      label="Extreme Energy Crash"
                      present={entrySymptoms.extremeEnergyCrash}
                    />
                  )}
                  {entrySymptoms.gassy && (
                    <SymptomsResult
                      label="Gassy during Day"
                      present={entrySymptoms.gassy}
                    />
                  )}
                  {entrySymptoms.lightheaded && (
                    <SymptomsResult
                      label="Lightheaded during Day"
                      present={entrySymptoms.lightheaded}
                    />
                  )}
                  {entrySymptoms.memoryIssues && (
                    <SymptomsResult
                      label="Memory Issues during Day"
                      present={entrySymptoms.memoryIssues}
                    />
                  )}
                  {entrySymptoms.napped && (
                    <SymptomsResult
                      label="Napped during Day"
                      present={entrySymptoms.napped}
                    />
                  )}
                  {entrySymptoms.ovaryPain && (
                    <SymptomsResult
                      label="Ovary Pain"
                      present={entrySymptoms.ovaryPain}
                    />
                  )}
                  {entrySymptoms.overAte && (
                    <SymptomsResult
                      label="Over Ate during Day"
                      present={entrySymptoms.overAte}
                    />
                  )}
                  {entrySymptoms.pms && (
                    <SymptomsResult
                      label="PMS during Day"
                      present={entrySymptoms.pms}
                    />
                  )}
                  {entrySymptoms.poorSleep && (
                    <SymptomsResult
                      label="Poor Sleep during Night"
                      present={entrySymptoms.poorSleep}
                    />
                  )}
                  {entrySymptoms.runnyNose && (
                    <SymptomsResult
                      label="Runny Nose"
                      present={entrySymptoms.runnyNose}
                    />
                  )}
                  {entrySymptoms.soreTeeth && (
                    <SymptomsResult
                      label="Sore Teeth"
                      present={entrySymptoms.soreTeeth}
                    />
                  )}
                  {entrySymptoms.soreThroat && (
                    <SymptomsResult
                      label="Sore Throat"
                      present={entrySymptoms.soreThroat}
                    />
                  )}
                  {entrySymptoms.speakingIssues && (
                    <SymptomsResult
                      label="Speaking Issues (Dyslexia, Slurring, Forgot Words)"
                      present={entrySymptoms.speakingIssues}
                    />
                  )}
                  {entrySymptoms.tenderBreasts && (
                    <SymptomsResult
                      label="Tender Breasts"
                      present={entrySymptoms.tenderBreasts}
                    />
                  )}
                  {entrySymptoms.tinnitus && (
                    <SymptomsResult
                      label="Tinnitus"
                      present={entrySymptoms.tinnitus}
                    />
                  )}
                  {entrySymptoms.nightSweats && (
                    <SymptomsResult
                      label="Night Sweats"
                      present={entrySymptoms.nightSweats}
                    />
                  )}
                  {entrySymptoms.ibsReaction && (
                    <SymptomsResult
                      label="IBS Reaction"
                      present={entrySymptoms.ibsReaction}
                    />
                  )}
                  {entrySymptoms.consumedPainkillers && (
                    <SymptomsResult
                      label="Had Painkillers"
                      present={entrySymptoms.consumedPainkillers}
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
