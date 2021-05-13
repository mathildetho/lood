import { useState } from 'react';

export const useContextData = (initialState) => {
  const [state, replaceState] = useState(initialState);

  const setState = (values) =>
    replaceState((prevState) => ({ ...prevState, ...values }));

  return [state, setState];
};
