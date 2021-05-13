import React from 'react';
import Button from '../../../../components/Inputs/Button/Button.component';
import { withRouter } from 'react-router-dom';
import PhotoInput from '../../../../components/Inputs/PhotoInput/PhotoInput.component';
import Input from '../../../../components/Inputs/Input/Input.component';
import TextArea from '../../../../components/Inputs/TextArea/TextArea.component';
import DateInput from '../../../../components/Inputs/DateInput/DateInput.component';
import RadioInput from '../../../../components/Inputs/Radio/RadioInput.component';
import IsStepHOC from '../../../../components/Navigation/Stepper/IsStepHOC';

const InscriptionProfil = (props) => {
  return (
    <div className="inscription__form">
      <div className="inscription-section">
        <div className="inscription-section-1">
          <PhotoInput
            onChange={(e) => {
              props.formProps.setFieldTouched('photo');
              props.formProps.setFieldValue('photo', e);
            }}
            error={
              props.formProps.touched.photo && props.formProps.errors.photo
            }
            name="photo"
            label="Photo de profil"
            isValid={
              !props.formProps.touched.photo || !props.formProps.errors.photo
            }
            value={props.formProps.values.photo}
          />
        </div>
        <div className="inscription-section-2">
          <Input
            label="Pseudo"
            name="pseudo"
            value={props.formProps.values.pseudo}
            onChange={(e) => {
              props.formProps.setFieldTouched('pseudo');
              props.formProps.setFieldValue('pseudo', e);
              props.formProps.handleChange(e);
            }}
            isValid={
              !props.formProps.touched.pseudo || !props.formProps.errors.pseudo
            }
            error={
              props.formProps.touched.pseudo && props.formProps.errors.pseudo
            }
            type="text"
          />
          <TextArea
            label="Ta description"
            name="description"
            value={props.formProps.values.description}
            onChange={(e) => {
              props.formProps.setFieldTouched('description');
              props.formProps.setFieldValue('description', e);
              props.formProps.handleChange(e);
            }}
            isValid={
              !props.formProps.touched.description ||
              !props.formProps.errors.description
            }
            error={
              props.formProps.touched.description &&
              props.formProps.errors.description
            }
          />
        </div>
        <div className="inscription-section-3">
          <DateInput
            label="Date de naissance"
            name="birthdate"
            value={props.formProps.values.birthdate}
            onChange={(day: Date) => {
              props.formProps.setFieldTouched('birthdate');
              props.formProps.setFieldValue('birthdate', day);
            }}
            isValid={
              !props.formProps.touched.birthdate ||
              !props.formProps.errors.birthdate
            }
            error={
              props.formProps.touched.birthdate &&
              props.formProps.errors.birthdate
            }
            type="date"
          />
          <RadioInput
            label="Sexe"
            name="sexe"
            value={props.formProps.values.sexe}
            options={['Homme', 'Femme', 'Autre']}
            onChange={(e) => {
              props.formProps.setFieldTouched('sexe');
              props.formProps.setFieldValue('sexe', e);
              props.formProps.handleChange(e);
            }}
            isValid={
              !props.formProps.touched.sexe || !props.formProps.errors.sexe
            }
            error={props.formProps.touched.sexe && props.formProps.errors.sexe}
          />
          <RadioInput
            label="Je recherche"
            name="lookFor"
            value={props.formProps.values.lookFor}
            options={['Homme', 'Femme', 'Tous']}
            onChange={(e) => {
              props.formProps.setFieldTouched('lookFor');
              props.formProps.setFieldValue('lookFor', e);
              props.formProps.handleChange(e);
            }}
            isValid={
              !props.formProps.touched.lookFor ||
              !props.formProps.errors.lookFor
            }
            error={
              props.formProps.touched.lookFor && props.formProps.errors.lookFor
            }
            type="text"
          />
        </div>
      </div>
      <Button
        className="inscription-section-4 --bg-pink"
        classNameText="--white"
        text="Suivant"
        onClick={() => props.submitStep()}
      />
    </div>
  );
};

export default IsStepHOC(withRouter(InscriptionProfil));
