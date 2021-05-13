import React from 'react';
import Stepper from './Stepper.component';
import _ from 'lodash';

const StepsWrapper = (props) => {
  // récupère le nombre d'étapes disponibles
  const getAvailableStepsIndeces = () => {
    const newAvailableSteps = [];
    props.steps.forEach((_: unknown, index: number) => {
      newAvailableSteps.push(index);
    });
    return newAvailableSteps;
  };

  // Permet de passer à l'étape suivante
  const nextStep = () => {
    if (props.currentStep + 1 < getAvailableStepsIndeces().length) {
      props.setStep(props.currentStep + 1);
    }
  };

  // Permet de définir l'étape affiché
  const setStep = (index: number) => {
    if (index >= 0 && index < getAvailableStepsIndeces().length) {
      props.setStep(index);
    }
  };

  // Permet de revenir à l'étape précédente
  const cancelStep = () => {
    if (props.currentStep > 0) {
      props.setStep(props.currentStep - 1);
    }
  };

  // récupère les erreurs de l'étape en cours
  const getErrors = (data: {
    pathsToValidate: { path: string; options: { noTouched: boolean } }[];
    finalStep?: boolean;
  }) => {
    const errors = [];
    const pathsToValidate = [...data.pathsToValidate];
    const options = {
      context: {
        values: props.formProps.values,
        formData: props.formProps.validationSchema,
        contextData: props.formProps.contextData,
      },
    };

    pathsToValidate.forEach((path) => {
      try {
        props.formProps.validationSchema.validateSyncAt(
          path,
          props.formProps.values,
          options
        );
      } catch (err) {
        err.errors && errors.push(err.errors[0]);
      }
    });

    const defaultError =
      errors.length > 0 &&
      'Un ou plusieurs champs sont en erreur, veuillez vérifier les informations renseignées.';

    return { defaultError };
  };

  const handleSubmitStep = (
    data: {
      pathsToValidate: { path: string; options: { noTouched: boolean } }[];
      finalStep: boolean;
    },
    nextStepSubstitute: () => void
  ) => {
    // vérifie que les inputs de l'étape ont été touchés
    const touched = { ...props.formProps.touched };
    const touchFunction = (path: {
      path: string;
      options: { noTouched: boolean };
    }) => {
      let pathStr: string;
      let touch: boolean;
      if (typeof path === 'object') {
        pathStr = path.path;
        touch = !path?.options?.noTouched;
      } else {
        pathStr = path;
        touch = true;
      }
      if (touch) {
        _.set(touched, pathStr, true);
      }
    };
    data.pathsToValidate.forEach(touchFunction);
    props.formProps.setTouched(touched);

    const { defaultError } = getErrors(data);

    if (!data.finalStep && !defaultError) {
      if (nextStepSubstitute) {
        nextStepSubstitute();
      } else {
        nextStep();
      }
    } else if (!defaultError) {
      props.formProps.submitForm();
    }
  };

  const step = props.steps[getAvailableStepsIndeces()[props.currentStep]];
  const availableSteps = props.steps.filter((_: unknown, index: number) =>
    getAvailableStepsIndeces().includes(index)
  );

  return (
    <>
      <Stepper
        steps={availableSteps}
        setStep={setStep}
        currentStep={props.currentStep}
        getErrors={getErrors}
      />
      {step?.component && (
        <step.component
          {...props}
          onSubmit={(nextStep: () => void) =>
            handleSubmitStep(step.data, nextStep)
          }
          cancelStep={cancelStep}
          nextStep={nextStep}
          setStep={setStep}
          {...getErrors(step.data)}
        />
      )}
    </>
  );
};

export default StepsWrapper;
