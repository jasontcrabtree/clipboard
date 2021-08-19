import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomSwitch from './CustomSwitch';
import ProfileSwitch from './ProfileSwitch';

/**
 * @returns {function} JSX Functional Component
 */
function SmartForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState,
    formState: { errors },
  } = useForm({});

  const [enabled, setEnabled] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // reset();
  };

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
      {/* <Controller
        control={control}
        name="switch"
        render={({ field }) => (
          <>
            <CustomSwitch {...field} switchLabel="Winter" />
          </>
        )}
        // render={({ field }) => <CustomSwitch {...field} switchLabel="Winter" />}
      /> */}
      {/* <Controller control={control} name="switch" /> */}
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

      {/* <ProfileSwitch name="profile" id="profile" /> */}

      <Switch.Group className="flex items-center" as="div">
        <Switch.Label className="mr-4">Slept poorly</Switch.Label>
        <span className="sr-only">Enable notifications</span>
        <Controller
          control={control}
          name="receiveNotifications"
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

      {/* <Controller
        name="switch"
        control={control}
        render={({ ref }) => (
          <Switch
            onChange={setEnabled}
            checked={enabled}
            inputRef={ref}
            className={`${
              enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        )}
      /> */}

      {/* <Controller
        name="switch"
        control={control}
        render={({ field: { value, ...field } }) => (
          <Switch
            // checked={enabled}
            // onChange={setEnabled}
            {...field}
            {...props}
            className={`${
              enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        )}
      /> */}
      {/* <Controller
        control={control}
        name="test"
        render={({ onChange, onBlur, value, name, ref }) => (
          <CustomSwitch
            switchLabel="Winter"
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.checked)}
            checked={value}
            inputRef={ref}
          />
        )}
      /> */}
      {/* <CustomSwitch {...register('switch')} switchLabel="Winter" /> */}
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

export default SmartForm;
