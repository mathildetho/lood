import React from 'react';
import { InputProps } from '../Input/Input.component';
import InputError from '../InputError/InputError.component';
import Label from '../Label/Label.component';
import './RadioInput.css';

interface RadioInputProps extends InputProps {
  options?: string[];
}

const RadioInput = (props: RadioInputProps) => {
  const {
    isValid,
    label,
    required,
    error,
    name,
    onChange,
    placeholder,
    options,
    value,
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
        <div className="radio-input__group">
          {options &&
            options.map((option: string, index) => (
              <div className="radio-input" key={index}>
                <input
                  className={`input__content --body-text input__content${
                    error && '--error'
                  }`}
                  name={name}
                  value={option}
                  placeholder={placeholder}
                  onChange={(e) => changeHandler(e)}
                  checked={option === value}
                  type="radio"
                />
                <label
                  className="radio-input__label --white --body-text"
                  htmlFor={option}
                >
                  {option}
                </label>
              </div>
            ))}
        </div>
      </div>
      {error && <InputError error={error} />}
    </div>
  );
};

export default RadioInput;
