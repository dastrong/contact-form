import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string;
}

export default function Input({ label, ...props }: Props) {
  const id = label.split(' ').join('-')

  return (
    <div className="w-full mb-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}{props.required && '*'}
      </label>

      <input
        id={id}
        {...props}
        type={props.type || "text"}
        autoComplete={props.autoComplete}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
      />
    </div>
  )
}