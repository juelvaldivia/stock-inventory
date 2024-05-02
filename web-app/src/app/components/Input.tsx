import React from 'react';

interface InputFormProps {
  name: string;
  textLabel?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
  value?: any;
  type?: string;
}
const InputForm: React.FC<InputFormProps> = ({
  name,
  textLabel,
  placeholder,
  onChange,
  value,
  type
}) => {
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      {textLabel && (
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {textLabel}
        </label>
      )}

      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        type={type || 'text'}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder || ''}
      />
      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </div>
  );
};

export default InputForm;
