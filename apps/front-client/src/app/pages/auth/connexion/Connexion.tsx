import { useMutation } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { LOGIN_USER } from '../../../graphql/mutations/auth';
import * as snackbarsActions from '../../../reducers/snackbar/actions';
import { connect } from 'react-redux';
import InscriptionConnexionLayout from '../../../components/Layout/InscriptionConnexionLayout/InscriptionConnexionLayout.component';
import { Formik, Form } from 'formik';
import {
  connexionValidationSchema,
  initialValue,
} from './ConnexionValidationSchema';
import Input from '../../../components/Inputs/Input/Input.component';
import Button from '../../../components/Inputs/Button/Button.component';
import SnackBarsWrapperComponent from '../../../components/Feedback/SnackBar/SnackBarsWrapper.component';

const Connexion = (props) => {
  const history = useHistory();

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (res) => {
      console.log('oncompleted', res);
      // push dans home looder
      history.push('/looding');
    },
    onError: (err) => {
      console.log('onError', err);
      props.addSnackbar('warning', err, 3000);
    },
  });

  return (
    <InscriptionConnexionLayout title="Connexion" img>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => {
            loginUser({
              variables: { ...values },
            });
          }}
          validationSchema={connexionValidationSchema}
        >
          {(props) => (
            <Form style={{ width: '23vw' }}>
              <div className="connexion__form">
                <div className="connexion-section">
                  <div style={{ width: '100%' }}>
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
                    <Input
                      label="Mot de passe"
                      name="password"
                      value={props.values.password}
                      onChange={(e) => {
                        props.setFieldTouched('password');
                        props.setFieldValue('password', e);
                        props.handleChange(e);
                      }}
                      isValid={
                        !props.touched.password || !props.errors.password
                      }
                      error={props.touched.password && props.errors.password}
                      type="password"
                    />
                  </div>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    className="--bg-pink"
                    classNameText="--white"
                    text="Me connecter"
                    submit
                  />
                  <Button
                    classNameText="--white"
                    className="button--secondary"
                    text="Mot de passe oublié"
                    submit
                    onClick={() => {
                      history.push('/reinitialiser-mot-de-passe', {
                        email: props.values.email,
                      });
                    }}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
    </InscriptionConnexionLayout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSnackbar: bindActionCreators(snackbarsActions.add, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Connexion);
