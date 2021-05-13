import React, { useState } from 'react';

const IsStepHOC = (WrappedComponent) => {
  const NewWrappedComponent = (props: any) => {
    const [stepSubmitted, setStepSubmitted] = useState(false);

    return (
      <WrappedComponent
        {...props}
        stepValid={!stepSubmitted}
        stepSubmitted={stepSubmitted}
        submitStep={(nextStep: () => void) => {
          setStepSubmitted(true);
          props.onSubmit(nextStep);
        }}
      />
    );
  };

  return NewWrappedComponent;
};

export default IsStepHOC;
