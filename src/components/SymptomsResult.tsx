import clsx from 'clsx';

type SymptomsDisplayProps = {
  label: string;
  present: boolean;
};

/**
 * @param {string} label The label of the rendered symptom
 * @returns {function} JSX Component
 */
export default function SymptomsResult({
  label,
  present,
}: SymptomsDisplayProps): JSX.Element {
  console.log(label);

  return (
    <span
      className={clsx(
        'text-sm uppercase font-medium border-gray-800 bg-gray-800 border rounded-md p-1',
        { 'text-pink-700': present, 'text-purple-500': !present },
      )}
    >
      {label}
    </span>
  );
}
