import { Form, Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import Button from '../../../components/Inputs/Button/Button.component';
import Input from '../../../components/Inputs/Input/Input.component';
import InscriptionConnexionLayout from '../../../components/Layout/InscriptionConnexionLayout/InscriptionConnexionLayout.component';
import {
  initialValue,
  reinitialisationPasswordValidationSchema,
} from './reinitialisationPasswordValidationSchema';
import * as snackbarsActions from '../../../reducers/snackbar/actions';
import { ApolloError, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { REINIT_PASSWORD } from '../../../graphql/mutations/auth';

const ReinitialisationPassword = (props: {
  match: { params: { token: string } };
  addSnackbar: (
    icon: string,
    message: { message: string } | ApolloError,
    time: number
  ) => void;
}) => {
  const history = useHistory();
  const [reinitPassword] = useMutation(REINIT_PASSWORD, {
    onCompleted: (res) => {
      const messageSuccess = res.reinitPassword;
      props.addSnackbar('success', messageSuccess, 3000);
      history.push('/se-connecter');
    },
    onError: (err: ApolloError | { message: string }) => {
      console.log('onError', err, typeof err);
      props.addSnackbar('warning', err, 3000);
    },
  });
  return (
    <InscriptionConnexionLayout
      title="Réinitialisation de ton mot de passe"
      img
      goHome
    >
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => {
          const token = props.match.params.token;
          reinitPassword({
            variables: { ...values, token },
          });
        }}
        validationSchema={reinitialisationPasswordValidationSchema}
      >
        {(props) => (
          <Form style={{ width: '23vw' }}>
            <div className="mot-de-passe-oublie__form">
              <Input
                label="Nouveau mot de passe"
                name="password"
                value={props.values.password}
                onChange={(e) => {
                  props.setFieldTouched('password');
                  props.setFieldValue('password', e);
                  props.handleChange(e);
                }}
                isValid={!props.touched.password || !props.errors.password}
                error={props.touched.password && props.errors.password}
                type="password"
              />
              <Button
                className="--bg-pink"
                classNameText="--white"
                text="Valider mon nouveau mot de passe"
                submit
              />
            </div>
          </Form>
        )}
      </Formik>
    </InscriptionConnexionLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    addSnackbar: bindActionCreators(snackbarsActions.add, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ReinitialisationPassword);
