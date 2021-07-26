import { FormEvent, useReducer } from 'react';
import Input from 'components/Input';
import Dropdown from 'components/Dropdown';
import Textarea from 'components/Textarea';

const DROPDOWN_OPTIONS = {
  How_Long: ['<1 month', '1-3 months', '3+ months'],
  How_Soon: ['1-2 weeks', '1-3 weeks', '4+ weeks'],
  What_Skills: ['Frontend', 'Backend', 'Database', 'CMS'],
};

export type State = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  how_long: string;
  how_soon: string;
  what_skills: string;
  message: string;
  show_success_msg: boolean;
};

const initialState: State = {
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  how_long: '',
  how_soon: '',
  what_skills: '',
  message: '',
  show_success_msg: false,
};

type Action =
  | { type: 'Change_First_Name'; value: string }
  | { type: 'Change_Last_Name'; value: string }
  | { type: 'Change_Phone_Number'; value: string }
  | { type: 'Change_Email'; value: string }
  | { type: 'Change_How_Long'; value: string }
  | { type: 'Change_How_Soon'; value: string }
  | { type: 'Change_What_Skills'; value: string }
  | { type: 'Change_Message'; value: string }
  | { type: 'Show_Success_Msg' }
  | { type: 'Reset' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'Change_First_Name':
      return { ...state, first_name: action.value };
    case 'Change_Last_Name':
      return { ...state, last_name: action.value };
    case 'Change_Phone_Number':
      return { ...state, phone_number: action.value };
    case 'Change_Email':
      return { ...state, email: action.value };
    case 'Change_How_Long':
      return { ...state, how_long: action.value };
    case 'Change_How_Soon':
      return { ...state, how_soon: action.value };
    case 'Change_What_Skills':
      return { ...state, what_skills: action.value };
    case 'Change_Message':
      return { ...state, message: action.value };
    case 'Show_Success_Msg':
      return { ...initialState, show_success_msg: true };
    case 'Reset':
      return { ...initialState };
    default:
      return state;
  }
};

export default function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // extract the success boolean, so we get everything else that we want
    const { show_success_msg, ...data } = state;
    // send a fetch with that data to our API route
    fetch('/api/contact', {
      method: 'post',
      body: JSON.stringify(data),
    })
      .then(r => r.json()) // can view the message from the API if you want
      .then(() => dispatch({ type: 'Show_Success_Msg' })) // show the success message
      .catch(console.log); // can do whatever you want with the errors here
  };

  return (
    <form className="w-96" onSubmit={onSubmit}>
      <Input
        required
        label="First Name"
        type="text"
        autoComplete="given-name"
        value={state.first_name}
        onChange={e => {
          dispatch({ type: 'Change_First_Name', value: e.currentTarget.value });
        }}
      />
      <Input
        required
        label="Last Name"
        type="text"
        autoComplete="family-name"
        value={state.last_name}
        onChange={e => {
          dispatch({ type: 'Change_Last_Name', value: e.currentTarget.value });
        }}
      />
      <Input
        required
        label="Mobile Number"
        type="tel"
        autoComplete="tel"
        value={state.phone_number}
        onChange={e => {
          dispatch({
            type: 'Change_Phone_Number',
            value: e.currentTarget.value,
          });
        }}
      />
      <Input
        required
        label="Email"
        type="email"
        autoComplete="email"
        value={state.email}
        onChange={e => {
          dispatch({ type: 'Change_Email', value: e.currentTarget.value });
        }}
      />

      <Dropdown
        required
        id="how_long"
        label="How long will you need to ...?"
        options={DROPDOWN_OPTIONS['How_Long']}
        value={state.how_long}
        onChange={e => {
          dispatch({ type: 'Change_How_Long', value: e.currentTarget.value });
        }}
      />
      <Dropdown
        required
        id="how_soon"
        label="How soon until you need to ...?"
        options={DROPDOWN_OPTIONS['How_Soon']}
        value={state.how_soon}
        onChange={e => {
          dispatch({ type: 'Change_How_Soon', value: e.currentTarget.value });
        }}
      />
      <Dropdown
        required
        id="what_skills"
        label="What skills do you need?"
        options={DROPDOWN_OPTIONS['What_Skills']}
        value={state.what_skills}
        onChange={e => {
          dispatch({
            type: 'Change_What_Skills',
            value: e.currentTarget.value,
          });
        }}
      />

      <Textarea
        required
        id="message"
        label="Message"
        value={state.message}
        rows={5}
        placeholder="Message"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
        onChange={e => {
          dispatch({ type: 'Change_Message', value: e.currentTarget.value });
        }}
      />

      <button
        type="submit"
        className="bg-white hover:bg-gray-100 w-full mt-2 mb-3 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Send Message
      </button>

      {state.show_success_msg && (
        <p className="mb-3 text-center text-gray-800">Success. Email Sent.</p>
      )}
    </form>
  );
}
