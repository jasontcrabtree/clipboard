import { Switch } from '@headlessui/react';
import { Controller, useForm } from 'react-hook-form';
import { HiOutlineStar, HiStar } from 'react-icons/hi';

// StarButton displays a single star
// It is controlled via active and onClick props
const StarButton = ({ active, onClick }) => (
  <button type="button" onClick={onClick} className="w-6 h-6 border-none ">
    {active ? (
      <HiStar
        color="secondary"
        className="w-6 h-6 text-indigo-700 stroke-current"
      />
    ) : (
      <HiOutlineStar className="w-6 h-6 text-grey-700 stroke-current" />
    )}
  </button>
);

// StarField uses 5 StarButtons to create a field
// with value and onChange props
// /**
//  * @typedef Starfield
//  * @prop {number} value Star Rating Nubmer
//  * @prop {function} onChange Action on rating change
//  *
//  * @param {number} value Number
//  * @param {function} onChange Function
//  * @returns {function} JSX Component
//  */
const StarField = ({ value, onChange }) => (
  <div className="flex flex-row gap-4 items-center">
    <StarButton active={value >= 1} onClick={() => onChange(1)} />
    <StarButton active={value >= 2} onClick={() => onChange(2)} />
    <StarButton active={value >= 3} onClick={() => onChange(3)} />
    <StarButton active={value >= 4} onClick={() => onChange(4)} />
    <StarButton active={value >= 5} onClick={() => onChange(5)} />
  </div>
);

/**
 * @typedef Address
 * @prop {string} street The Street
 * @prop {string} city The city
 * @prop {number} zip The zip code
 *
 * @typedef {Customer}
 * @prop {string} name Customer name
 * @prop {string} email Customer email
 * @prop {Address} address The customer's address
 */

/** @type {Customer} */
// const theCustomer = { ...Address.street };

/**
 * @returns {function} JSX Functional Component
 */
function SmartForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    const submitted = data;
    return submitted;
    // reset();
  };

  return (
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

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <input
            type="date"
            onChange={(e) => field.onChange(e)}
            selected={field.value}
          />
        )}
      />
      <Controller
        name="rating"
        control={control}
        render={({ field }) => <StarField {...field} />}
      />

      <Switch.Group className="flex items-center" as="div">
        <Switch.Label className="mr-4">Slept poorly</Switch.Label>
        <span className="sr-only">Sleep rating</span>
        <Controller
          defaultValue={false}
          control={control}
          name="sleepBoolean"
          render={({ field: { onChange, value, name } }) => (
            <Switch
              checked={value}
              id={name}
              onChange={onChange}
              className={`${
                value ? 'bg-green-600' : 'bg-gray-400'
              } relative inline-flex items-center flex-shrink-0 h-8 transition-colors duration-200 ease-in-out border-transparent rounded-full cursor-pointer w-12 b-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700`}
            >
              <span
                className={`${
                  value ? 'translate-x-5' : 'translate-x-1'
                } pointer-events-none inline-block w-5 h-5 transform bg-white rounded-full shadow ease-in-out duration-300 ring-0`}
              />
            </Switch>
          )}
        />
      </Switch.Group>

      {errors.city && <span>This field is required</span>}
      <input
        className="p-2 border-gray-300 bg-indigo-800 text-gray-100 font-semibold rounded-md"
        type="submit"
        value="Submit"
      />
    </form>
  );
}

export default SmartForm;
