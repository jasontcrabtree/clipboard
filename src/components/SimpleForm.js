import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

/**
 * @returns {function} JSX Functional Component
 */
function SimpleForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setTimeout(
      () =>
        reset({
          name: '',
          city: '',
        }),
      300
    );
  };

  // watch input value by passing the name of it
  // console.log(watch('name'));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="flex flex-col gap-6 rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <input
        defaultValue="Jason"
        {...register('name')}
        className="p-2 rounded border-gray-300"
        type="text"
      />
      {/* include validation with required or other standard HTML validation rules */}
      <input
        defaultValue="Dublin"
        {...register('city', { required: true })}
        className="p-2 rounded border-gray-300"
        type="text"
      />
      {/* errors will return when field validation fails  */}
      {errors.city && <span>This field is required</span>}
      <input
        className="p-2 border-gray-300 bg-indigo-800 text-gray-100 font-semibold rounded-md"
        type="submit"
        value="Submit"
      />
    </form>
  );
}

export default SimpleForm;
