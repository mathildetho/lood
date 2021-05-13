import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import StepsWrapper from '../../../components/Navigation/Stepper/StepsWrapper.component';
import {
  inscriptionValidationSchema,
  initialValue,
} from './inscriptionValidationSchema';
import InscriptionProfil from './steps/InscriptionProfil';
import '../Sign.css';
import InscriptionCompte from './steps/InscriptionCompte';
import { CREATE_USER } from '../../../graphql/mutations/auth';
import { useMutation } from '@apollo/client';
import * as snackbarsActions from '../../../reducers/snackbar/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InscriptionConnexionLayout from '../../../components/Layout/InscriptionConnexionLayout/InscriptionConnexionLayout.component';
import { useContextData } from '../../../utils/customHooks';

const Inscription = (props) => {
  const history = useHistory();
  const [contextData, setContextData] = useContextData({
    photoPreview: '',
    step: 0,
    fetchErreur: false,
    succesEnvoi: false,
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (res) => {
      console.log('onCompleted', res);
      props.addSnackbar(
        'ok',
        `Bienvenue chez lood ${res.createUser.pseudo} !`,
        3000
      );
      history.push('/');
    },
    onError: (err) => {
      console.log('onError', err);
      props.addSnackbar('warning', err, 3000);
    },
  });

  return (
    <InscriptionConnexionLayout title="Création de compte">
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => {
          const photoData = JSON.stringify({
            type: values.photo.type,
            data: values.photo.data,
          });
          createUser({
            variables: { userInput: { ...values, photo: photoData } },
          });
        }}
        validationSchema={inscriptionValidationSchema}
      >
        {(props) => (
          <Form style={{ width: 'fit-content' }}>
            <StepsWrapper
              formProps={{
                ...props,
                validationSchema: inscriptionValidationSchema,
                contextData: contextData,
                setContextData: (value) => setContextData(value),
              }}
              contextData={contextData}
              setContextData={(value) => setContextData(value)}
              validationSchema={inscriptionValidationSchema}
              currentStep={contextData.step}
              setStep={(value: number) => setContextData({ step: value })}
              steps={[
                {
                  component: InscriptionProfil,
                  title: 'Profil',
                  data: {
                    pathsToValidate: [
                      'photo',
                      'pseudo',
                      'description',
                      'birthdate',
                      'sexe',
                      'lookFor',
                    ],
                  },
                },
                {
                  component: InscriptionCompte,
                  title: 'Identifiants',
                  data: {
                    pathsToValidate: ['email', 'password'],
                    finalStep: true,
                  },
                },
              ]}
            />
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

export default connect(null, mapDispatchToProps)(Inscription);
