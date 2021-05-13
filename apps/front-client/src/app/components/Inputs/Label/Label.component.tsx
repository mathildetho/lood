import React from 'react';
import { InputProps } from '../Input/Input.component';

const Label = ({ name, label, required, isValid }: Partial<InputProps>) => {
  const validClassname = isValid ? '--valid' : '--error'; // Valide ou contient une erreur

  return (
    <label
      className={`label --margin-bottom-2 --margin-left-2 --body-text label${validClassname}`}
      htmlFor={name}
    >
      {label}&nbsp;{required && '*'}
    </label>
  );
};

export default Label;
