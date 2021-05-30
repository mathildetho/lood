import { FormikErrors } from 'formik';
import React, { useEffect, useState } from 'react';
import Icon from '../../DataDisplay/Icon/Icon.component';
import InputError from '../InputError/InputError.component';
import Label from '../Label/Label.component';
import './Input.css';
import EyeClose from '../../../../assets/img/eye-close.svg';
import EyeOpen from '../../../../assets/img/eye-open.svg';

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

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [typeInput, setTypeInput] = useState(type);

  useEffect(() => {
    if (passwordVisible && type === 'password') {
      setTypeInput('text');
    } else if (!passwordVisible && type === 'password') {
      setTypeInput(type);
    }
  }, [passwordVisible, type]);

  return (
    <div className="input --margin-bottom-4">
      <div className="fieldset">
        <Label
          name={name}
          label={label}
          required={required}
          isValid={isValid}
        />
        <div style={{ position: 'relative', width: 'fit-content' }}>
          <input
            className={`input__content --body-text input__content${
              error && '--error'
            }`}
            name={name}
            value={value || ''}
            placeholder={placeholder}
            onChange={changeHandler}
            type={typeInput}
          />
          {type === 'password' && (
            <Icon
              path={passwordVisible ? EyeOpen : EyeClose}
              className="input__password-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          )}
        </div>
      </div>
      {error && <InputError error={error} />}
    </div>
  );
};

export default Input;
