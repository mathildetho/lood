import React from 'react';
import Button from '../../../../components/Inputs/Button/Button.component';
import { withRouter } from 'react-router-dom';
import Input from '../../../../components/Inputs/Input/Input.component';
import IsStepHOC from '../../../../components/Navigation/Stepper/IsStepHOC';

const InscriptionCompte = (props) => {
  return (
    <div className="inscription__form">
      <div className="inscription-section">
        <div className="inscription-section-1">
          <Input
            label="E-mail"
            name="email"
            value={props.formProps.values.email}
            onChange={(e) => {
              props.formProps.setFieldTouched('email');
              props.formProps.setFieldValue('email', e);
              props.formProps.handleChange(e);
            }}
            isValid={
              !props.formProps.touched.email || !props.formProps.errors.email
            }
            error={
              props.formProps.touched.email && props.formProps.errors.email
            }
            type="text"
          />
          <Input
            label="Mot de passe"
            name="password"
            value={props.formProps.values.password}
            onChange={(e) => {
              props.formProps.setFieldTouched('password');
              props.formProps.setFieldValue('password', e);
              props.formProps.handleChange(e);
            }}
            isValid={
              !props.formProps.touched.password ||
              !props.formProps.errors.password
            }
            error={
              props.formProps.touched.password &&
              props.formProps.errors.password
            }
            type="password"
          />
        </div>
      </div>
      <Button
        className="inscription-section-4 --bg-pink"
        classNameText="--white"
        text="Créer mon compte"
        submit={props.stepValid}
        onClick={() => {
          props.submitStep();
        }}
      />
    </div>
  );
};

export default IsStepHOC(withRouter(InscriptionCompte));
