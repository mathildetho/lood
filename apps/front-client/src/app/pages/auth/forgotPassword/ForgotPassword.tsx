import { Form, Formik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import Button from '../../../components/Inputs/Button/Button.component';
import Input from '../../../components/Inputs/Input/Input.component';
import InscriptionConnexionLayout from '../../../components/Layout/InscriptionConnexionLayout/InscriptionConnexionLayout.component';
import {
  initialValue,
  forgotPasswordValidationSchema,
} from './forgotPasswordValidationSchema';
import * as snackbarsActions from '../../../reducers/snackbar/actions';
import { ApolloError, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { SEND_EMAIL_REINIT_PASSWORD } from '../../../graphql/mutations/auth';

const ForgotPassword = (props: {
  addSnackbar: (
    icon: string,
    message: { message: string } | ApolloError,
    time: number
  ) => void;
}) => {
  const history = useHistory();
  const [sendEmailReinitPassword] = useMutation(SEND_EMAIL_REINIT_PASSWORD, {
    onCompleted: (res) => {
      const messageSuccess = res.sendEmailReinitPassword;
      props.addSnackbar('success', messageSuccess, 3000);
      history.push('/');
    },
    onError: (err: ApolloError | { message: string }) => {
      props.addSnackbar('warning', err, 3000);
    },
  });
  return (
    <InscriptionConnexionLayout title="Mot de passe oublié" img>
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => {
          sendEmailReinitPassword({
            variables: { ...values },
          });
        }}
        validationSchema={forgotPasswordValidationSchema}
      >
        {(props) => (
          <Form style={{ width: '23vw' }}>
            <div className="mot-de-passe-oublie__form">
              <Input
                label="E-mail"
                name="email"
                value={props.values.email}
                onChange={(e) => {
                  props.setFieldTouched('email');
                  props.setFieldValue('email', e);
                  props.handleChange(e);
                }}
                isValid={!props.touched.email || !props.errors.email}
                error={props.touched.email && props.errors.email}
                type="text"
              />
              <Button
                className="--bg-pink"
                classNameText="--white"
                text="Réinitialiser mon mot de passe"
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

export default connect(null, mapDispatchToProps)(ForgotPassword);
