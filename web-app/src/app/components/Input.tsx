import React from 'react';

interface InputFormProps {
  name: string;
  classNameCustom?: string;
  inputClassCustom?: string;
  textLabel?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
  value?: any;
  type?: string;
  showRequired?: boolean;
  required?: boolean;
}
const InputForm: React.FC<InputFormProps> = ({
  name,
  classNameCustom,
  inputClassCustom,
  textLabel,
  placeholder,
  onChange,
  value,
  type,
  showRequired,
  required
}) => {
  return (
    <div className={classNameCustom || 'w-full md:w-1/2 px-3 mb-1 md:mb-0'}>
      {textLabel && (
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {textLabel}
        </label>
      )}
      {showRequired && !value && required && (
        <p className="text-red-500 text-xs italic">* {placeholder} es requerido.</p>
      )}
      <input
        className={
          inputClassCustom ||
          'appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-xs'
        }
        type={type || 'text'}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder || ''}
        required={required}
      />
    </div>
  );
};

export default InputForm;
