import { useState } from 'react';
import { Switch } from '@headlessui/react';
import PropTypes from 'prop-types';

function CustomSwitch({ switchLabel }) {
  const [enabled, setEnabled] = useState(false);

  console.log(enabled);

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">{switchLabel || 'Toggle'}</Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-green-700' : 'bg-gray-400'
          } relative inline-flex items-center h-8 rounded-full w-16`}
        >
          <span className="sr-only">{switchLabel || 'Toggle'}</span>
          <span
            className={`${
              enabled ? 'translate-x-10' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}

CustomSwitch.propTypes = {
  switchLabel: PropTypes.string.isRequired,
};

export default CustomSwitch;