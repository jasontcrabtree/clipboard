import { request } from 'graphql-request';
import { useForm } from 'react-hook-form';
import { useSession } from '../../node_modules/next-auth/client';

/**
 *
 * @returns {function} JSX Component
 */
function NewEntryV2(value: boolean): JSX.Element {
  const [session, loading] = useSession();

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
              has_digestive_issues
          }
        }
      }
    }
  `;

  const onSubmit = (values) => {
    console.log(values);

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
                has_digestive_issues: values.has_digestive_issues,
                has_sore_neck: values.has_sore_neck,
                has_sore_stomach: values.has_sore_stomach,
                has_headache: values.has_headache,
              },
            },
          },
        },
      },
    };

    console.log(variables);

    request('/api/graphql', mutation, variables);
    reset();
  };

  const symptomsList = [
    ['has_headache', 'Headache'],
    ['has_tired', 'Tired'],
    ['has_digestive_issues', 'Digestive Issues'],
    ['has_sore_neck', 'Sore Neck'],
    ['has_sore_stomach', 'Sore Stomach'],
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
  console.log(today);

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
      <input
        defaultValue={today}
        {...register('day')}
        className="p-2 rounded border-gray-300"
        type="date"
      />
      <input
        defaultValue="A great day"
        {...register('day_summary')}
        className="p-2 rounded border-gray-300"
        type="text"
      />
      <fieldset className="p-2 text-gray-200 flex flex-wrap flex-row">
        <legend className="flex flex-wrap">Toggle Present Symptoms</legend>
        {symptomsList.map((symptom) => {
          return (
            <label key={symptom[0]} className="pr-4 whitespace-nowrap">
              <input
                type="checkbox"
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
