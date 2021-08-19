import { Controller, useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react';

/**
 * @returns {function} JSX function
 */
function ProfileSwitch() {
  const { getValues, control, handleSubmit, formState, reset } = useForm({});

  return (
    <Switch.Group className="flex items-center" as="div">
      <Switch.Label className="mr-4">
        Notify me of administrative events
      </Switch.Label>
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
              value ? 'bg-indigo-600' : 'bg-gray-300'
            } relative inline-flex items-center flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-transparent rounded-full cursor-pointer w-11 b-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700`}
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
  );
}

export default ProfileSwitch;
