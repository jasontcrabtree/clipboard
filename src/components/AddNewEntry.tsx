import { request } from 'graphql-request';
import { useForm } from 'react-hook-form';

/**
 *
 * @returns {function} JSX Component
 */
function AddNewEntry(): JSX.Element {
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

    request('/api/graphql', mutation, variables);
    reset();
  };

  return (
    <form
      className="flex flex-col gap-6 rounded min-w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="user_id" className="flex flex-col text-gray-200">
        User ID
        <input
          defaultValue="2feb2bef-48f0-41f9-aff1-34314eab7369"
          {...register('user_id')}
          className="p-2 rounded border-gray-300 text-gray-400"
          type="text"
        />
      </label>
      <label htmlFor="" className="flex flex-col text-gray-200">
        Day Entry Date
        <input
          defaultValue="2021-09-08"
          {...register('day')}
          className="p-2 rounded border-gray-300 text-gray-700"
          type="date"
        />
      </label>
      <label htmlFor="" className="flex flex-col text-gray-200">
        Day Summary
        <input
          defaultValue="A great day"
          {...register('day_summary')}
          className="p-2 rounded border-gray-300 text-gray-700"
          type="text"
        />
      </label>
      <label htmlFor="" className="flex flex-col text-gray-200">
        Tired?
        <input
          defaultValue="false"
          {...register('has_tired')}
          className="p-2 rounded border-gray-300 text-gray-700"
          type="text"
        />
      </label>
      <label htmlFor="" className="flex flex-col text-gray-200">
        Headache?
        <input
          defaultValue="false"
          {...register('has_headache')}
          className="p-2 rounded border-gray-300 text-gray-700"
          type="text"
        />
      </label>
      <label htmlFor="" className="flex flex-col text-gray-200">
        Sore Neck?
        <input
          defaultValue="false"
          {...register('has_sore_neck')}
          className="p-2 rounded border-gray-300 text-gray-700"
          type="text"
        />
      </label>
      <label htmlFor="" className="flex flex-col text-gray-200">
        Sore Stomach?
        <input
          defaultValue="false"
          {...register('has_sore_stomach')}
          className="p-2 rounded border-gray-300 text-gray-700"
          type="text"
        />
      </label>
      <label htmlFor="" className="flex flex-col text-gray-200">
        Digestive Issues?
        <input
          defaultValue="false"
          {...register('has_digestive_issues')}
          className="p-2 rounded border-gray-300 text-gray-700"
          type="text"
        />
      </label>
      {errors.city && <span>This field is required</span>}
      <input
        className="p-2 border-blue-900 bg-indigo-900 text-gray-100 font-semibold rounded-md"
        type="submit"
        value="Add New"
      />
    </form>
  );
}

export default AddNewEntry;
