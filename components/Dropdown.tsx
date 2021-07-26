import { ChangeEvent } from 'react';

type Props = {
  options: string[];
  id: string;
  label: string;
  required: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown(props: Props) {
  return (
    <div className="w-full mb-3 relative">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
        {props.required && '*'}
      </label>

      <select
        value={props.value}
        onChange={props.onChange}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value={''}>Select...</option>
        {props.options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
