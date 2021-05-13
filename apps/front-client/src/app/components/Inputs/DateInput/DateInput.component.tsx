import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import formatDate from 'react-day-picker/moment';
import parseDate from 'react-day-picker/moment';
import InputError from '../InputError/InputError.component';
import Label from '../Label/Label.component';
import './DateInput.css';

interface DateInputProps {
  name: string;
  label: string;
  required?: boolean;
  isValid: boolean;
  value: string;
  onChange: (day: Date) => void;
  error: string;
  type: string;
}

const DateInput = ({
  name,
  label,
  required,
  isValid,
  value,
  onChange,
  error,
  type,
}: DateInputProps) => {
  const changeDate = (day: Date) => {
    onChange && onChange(day);
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
        <DayPickerInput
          placeholder="DD/MM/YYYY"
          format="DD/MM/YYYY"
          {...formatDate}
          {...parseDate}
          onDayChange={changeDate}
          value={value}
          inputProps={{
            className: `input__content --body-text input__content${
              error ? '--error' : ''
            }`,
            type: type,
          }}
        />
      </div>
      {error && <InputError error={error} />}
    </div>
  );
};

export default DateInput;
