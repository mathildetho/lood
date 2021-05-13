import React from 'react';
import './Stepper.css';

interface StepperProps {
  steps: Step[];
  currentStep: number;
  setStep: (value: number) => void;
  getErrors: (data: any) => any;
}

interface Step {
  component: any;
  title: string;
  data: any;
  finalStep?: boolean;
}

const Stepper = (props: StepperProps) => {
  const { steps, currentStep, setStep, getErrors } = props;
  const canChangeStep = (index: number) => {
    const step = steps[index];

    if (!getErrors(step.data).defaultError || currentStep === index) {
      return true;
    } else {
      return false;
    }
  };

  // aller à une étape
  const allerEtape = (index: number) => {
    if (canChangeStep(index)) {
      setStep(index);
    }
  };

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div className="stepper__etape" key={index}>
          <p
            className={`stepper__etape-title --button-text stepper__etape-title${
              canChangeStep(index) && '--clickable'
            }`}
            onClick={() => allerEtape(index)}
          >
            {step.title}
          </p>
          {!step.data.finalStep && <div className="stepper__etape-line" />}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
