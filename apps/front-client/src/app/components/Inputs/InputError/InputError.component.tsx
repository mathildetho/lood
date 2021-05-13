import { FormikErrors } from 'formik';
import React from 'react';

interface InputErrorProps {
  error: string | string[] | FormikErrors<unknown> | FormikErrors<unknown>[];
}
const InputError = ({ error }: InputErrorProps) => {
  return (
    <p className="--body-text-small --light-pink --margin-top-1 --margin-left-1 --margin-right-1">
      {error}
    </p>
  );
};

export default InputError;
