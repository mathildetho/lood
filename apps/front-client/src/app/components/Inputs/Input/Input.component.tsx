import { FormikErrors } from 'formik';
import React from 'react';
import InputError from '../InputError/InputError.component';
import Label from '../Label/Label.component';
import './Input.css';

export interface InputProps {
  label: string;
  required?: boolean;
  isValid?: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  error: string | string[] | FormikErrors<unknown> | FormikErrors<unknown>[];
  name?: string;
  placeholder?: string;
  value: string;
  type?: string;
}

const Input = (props: InputProps) => {
  const {
    isValid,
    label,
    required,
    error,
    name,
    onChange,
    placeholder,
    value,
    type,
  } = props;
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <div className="input --margin-bottom-4">
      <div className="fieldset">
        <Label
          name={name}
          label={label}
          required={required}
          isValid={isValid}
        />
        <input
          className={`input__content --body-text input__content${
            error && '--error'
          }`}
          name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={changeHandler}
          type={type}
        />
      </div>
      {error && <InputError error={error} />}
    </div>
  );
};

export default Input;
