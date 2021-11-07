import { request } from 'graphql-request';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from '../../node_modules/next-auth/client';

/**
 *
 * @returns {function} JSX Component
 */
function NewEntryV2(): JSX.Element {
  const [session, loading] = useSession();
  const [noSymptomsActivated, setNoSymptomsActivated] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   const mutation = `mutation insert_daily_entry($object: daily_entries_insert_input!) {
  //       insert_daily_entries_one(object: $object) {
  //         id
  //         day
  //         day_summary
  //     }
  //   }
  // `;

  const mutation = `mutation insert_daily_entry($object: daily_entries_insert_input!) {
        insert_daily_entries_one(object: $object) {
          id
          day
          day_summary
          user_id
          daily_entries_has_join_to_symptoms {
            daily_entries_symptoms_join_table_symptoms {
              id
              created_at
              has_tired
              has_headache
              has_sore_neck
              has_sore_stomach
              has_awake_during_night
              has_bloating
              has_bad_breath
              has_blurred_vision
              has_bodyache
              has_cold_sensitivity
              has_concentration_issues
              has_constipation
              has_crying
              has_diarrhea
              has_distracted
              has_dizzy
              has_emotional_eating
              has_energy_crash
              has_extreme_energy_crash
              has_gassy
              has_lightheaded
              has_memory_issues
              has_nap
              has_no_symptoms
              has_ovary_pain
              has_pms
              has_overeating
              has_poor_sleep
              has_runny_nose
              has_sore_teeth
              has_sore_throat
              has_speaking_issues
              has_tender_breasts
              has_tinnitus
              has_night_sweats
              has_ibs_reaction
              has_consumed_painkillers
          }
        }
      }
    }
  `;

  const onSubmit = (values) => {
    // console.log(values);

    /***
     * Puts RHF values into the correct data shape for the graphql mutation
     */
    const variables = {
      object: {
        user_id: values.user_id,
        day: values.day,
        day_summary: values.day_summary,
        daily_entries_has_join_to_symptoms: {
          data: {
            daily_entries_symptoms_join_table_symptoms: {
              data: {
                has_tired: values.has_tired,
                has_sore_neck: values.has_sore_neck,
                has_sore_stomach: values.has_sore_stomach,
                has_headache: values.has_headache,
                has_awake_during_night: values.has_awake_during_night,
                has_bloating: values.has_bloating,
                has_bad_breath: values.has_bad_breath,
                has_blurred_vision: values.has_blurred_vision,
                has_bodyache: values.has_bodyache,
                has_cold_sensitivity: values.has_cold_sensitivity,
                has_concentration_issues: values.has_concentration_issues,
                has_constipation: values.has_constipation,
                has_crying: values.has_crying,
                has_diarrhea: values.has_diarrhea,
                has_distracted: values.has_distracted,
                has_dizzy: values.has_dizzy,
                has_emotional_eating: values.has_emotional_eating,
                has_energy_crash: values.has_energy_crash,
                has_extreme_energy_crash: values.has_extreme_energy_crash,
                has_gassy: values.has_gassy,
                has_lightheaded: values.has_lightheaded,
                has_memory_issues: values.has_memory_issues,
                has_nap: values.has_nap,
                has_no_symptoms: values.has_no_symptoms,
                has_ovary_pain: values.has_ovary_pain,
                has_pms: values.has_pms,
                has_overeating: values.has_overeating,
                has_poor_sleep: values.has_poor_sleep,
                has_runny_nose: values.has_runny_nose,
                has_sore_teeth: values.has_sore_teeth,
                has_sore_throat: values.has_sore_throat,
                has_speaking_issues: values.has_speaking_issues,
                has_tender_breasts: values.has_tender_breasts,
                has_tinnitus: values.has_tinnitus,
                has_night_sweats: values.has_night_sweats,
                has_ibs_reaction: values.has_ibs_reaction,
                has_consumed_painkillers: values.has_consumed_painkillers,
              },
            },
          },
        },
      },
    };

    // console.log(variables);

    request('/api/graphql', mutation, variables);
    reset();
  };

  const symptomsList = [
    ['has_no_symptoms', 'No Symptoms'],
    ['has_headache', 'Headache'],
    ['has_tired', 'Tired'],
    ['has_sore_neck', 'Sore Neck'],
    ['has_sore_stomach', 'Sore Stomach'],
    ['has_awake_during_night', 'Woke up During Night'],
    ['has_bloating', 'Bloated'],
    ['has_bad_breath', 'Bad Breath'],
    ['has_blurred_vision', 'Blurred Vision'],
    ['has_bodyache', 'Body Aches'],
    ['has_cold_sensitivity', 'Cold Sensitivity'],
    ['has_concentration_issues', 'Concentration Issues'],
    ['has_constipation', 'Constipated'],
    ['has_crying', 'Cried'],
    ['has_diarrhea', 'Diarrhea'],
    ['has_distracted', 'Distracted'],
    ['has_dizzy', 'Dizzy'],
    ['has_emotional_eating', 'Emotional Eating'],
    ['has_energy_crash', 'Energy Crash'],
    ['has_extreme_energy_crash', 'Extreme Energy Crash'],
    ['has_gassy', 'Gassy'],
    ['has_lightheaded', 'Lightheaded'],
    ['has_memory_issues', 'Memory Issues'],
    ['has_nap', 'Nap'],
    ['has_ovary_pain', 'Ovary Pain'],
    ['has_pms', 'PMS'],
    ['has_overeating', 'Overate/Overating'],
    ['has_poor_sleep', 'Poor Sleep'],
    ['has_runny_nose', 'Runny Nose'],
    ['has_sore_teeth', 'Sore Teeth'],
    ['has_sore_throat', 'Sore Throat'],
    ['has_speaking_issues', 'Speaking Issues'],
    ['has_tender_breasts', 'Tender Breasts'],
    ['has_tinnitus', 'Tinnitus'],
    ['has_night_sweats', 'Night Sweats'],
    ['has_ibs_reaction', 'IBS Reaction'],
    ['has_consumed_painkillers', 'Took Painkillers'],
  ];

  if (!session) return null;

  if (loading) return <div>Loading</div>;

  // if (session) {
  //   // @ts-ignore
  //   const user = session?.user_id?.data?.users[0].user_id;
  // }

  // eslint-disable-next-line require-jsdoc
  function userID(sessionValue) {
    const user = sessionValue?.user_id?.data?.users[0].user_id;
    return user;
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      className="flex flex-col gap-6 rounded min-w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        defaultValue={session ? userID(session) : 'no user'}
        {...register('user_id')}
        className="p-2 rounded border-gray-300 text-gray-400 hidden"
        type="text"
      />
      <label htmlFor="day" className="flex flex-col gap-1 font-bold">
        Entry Date
        <input
          defaultValue={today}
          {...register('day')}
          className="p-2 rounded border-gray-300 font-normal"
          type="date"
        />
      </label>
      <label htmlFor="day_summary" className="flex flex-col gap-1 font-bold">
        <span>
          Entry Summary
          <span className="text-sm text-green-600 fw-semibold">(*Text)</span>
        </span>
        <input
          defaultValue="A great day"
          {...register('day_summary')}
          className="p-2 rounded border-gray-300 font-normal"
          type="text"
        />
      </label>
      <fieldset className="p-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 flex flex-wrap flex-row rounded gap-3">
        <legend className="flex flex-wrap bg-yellow-100 border border-gray-400 px-4 px-4 rounded-lg">
          Select Symptoms present on the day of the entry.
        </legend>
        {symptomsList.map((symptom) => {
          if (symptom[0] === 'has_no_symptoms') {
            // console.log('No Symptoms');
          }

          const ref = symptom[0];

          // ref === 'has_no_symptoms' ? console.log('yes') : console.log('no');

          return (
            <label
              key={symptom[0]}
              className="bg-gray-100 border border-gray-300 p-2 rounded pr-4 whitespace-nowrap text-lg md:text-base"
            >
              <input
                type="checkbox"
                disabled={noSymptomsActivated}
                itemRef={ref}
                defaultChecked={false}
                {...register(symptom[0])}
              />
              <span className="pl-1">{symptom[1]}</span>
            </label>
          );
        })}
      </fieldset>
      {errors.city && <span>This field is required</span>}
      <input
        className="p-2 border-blue-900 bg-indigo-900 text-gray-100 font-semibold rounded-md"
        type="submit"
        value="Add New"
      />
    </form>
  );
}

export default NewEntryV2;
