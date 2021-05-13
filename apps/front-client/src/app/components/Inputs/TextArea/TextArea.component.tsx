import React from 'react';
import { InputProps } from '../Input/Input.component';
import InputError from '../InputError/InputError.component';
import Label from '../Label/Label.component';

const TextArea = (props: InputProps) => {
  const {
    isValid,
    label,
    required,
    error,
    name,
    onChange,
    placeholder,
    value,
  } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
  };

  return (
    <div className={`textarea`}>
      <div className="fieldset">
        <Label
          name={name}
          label={label}
          required={required}
          isValid={isValid}
        />
        <textarea
          className={`input__content input__textarea --body-text input__content${
            error && '--error'
          }`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />
        {error && <InputError error={error} />}
      </div>
    </div>
  );
};

export default TextArea;
