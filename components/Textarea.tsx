import { ChangeEvent, TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
  rows: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea(props: Props) {
  return (
    <div className="w-full mb-3">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
        {props.required && '*'}
      </label>
      <div className="mt-1">
        <textarea
          id={props.id}
          rows={props.rows}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
