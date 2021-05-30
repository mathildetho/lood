import * as yup from 'yup';

const initialValue = {
  password: '',
};

const reinitialisationPasswordValidationSchema = yup.object().shape({
  password: yup.string().required('Ton mot de passe est requis'),
});

export { reinitialisationPasswordValidationSchema, initialValue };
