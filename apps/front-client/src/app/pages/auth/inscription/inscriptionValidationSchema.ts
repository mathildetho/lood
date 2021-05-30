import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

function checkIfFilesAreTooBig(file?: File): boolean {
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 10) {
      valid = false;
    }
    return valid;
  }
  return valid;
}

function checkIfFilesAreCorrectType(file?: File): boolean {
  let valid = true;
  if (file) {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      valid = false;
    }
    return valid;
  }
  return valid;
}

const initialValue = {
  photo: null,
  pseudo: '',
  description: '',
  birthdate: null,
  sexe: null,
  lookFor: null,
  email: '',
  password: '',
};

const inscriptionValidationSchema = yup.object().shape({
  photo: yup
    .mixed()
    .required('Ta photo est requise')
    .test(
      'is-correct-file',
      'Ta photo est trop volumineuse',
      checkIfFilesAreTooBig
    )
    .test(
      'is-big-file',
      "Le format de ta photo n'est pas supporté",
      checkIfFilesAreCorrectType
    ),
  pseudo: yup
    .string()
    .required('Ton pseudo est requis')
    .min(6, 'Ton pseudo doit contenir 6 caractères minimun'),
  description: yup
    .string()
    .required('Ta description est requise')
    .min(30, 'Écris au moins 30 caractères'),
  birthdate: yup
    .date()
    .typeError("La date n'est pas valide")
    .required("Ta date d'anniversaire est requise"),
  sexe: yup
    .string()
    .matches(/(Homme|Femme|Autre)/, 'Ton sexe est requis')
    .nullable()
    .required('Ton sexe est requis'),
  lookFor: yup
    .string()
    .matches(/(Homme|Femme|Tous)/, 'Ton type de recherche est requise')
    .nullable()
    .required('Ton type de recherche est requise'),
  email: yup
    .string()
    .email('Entre un email valide')
    .required('Ton email est requis'),
  password: yup
    .string()
    .min(
      6,
      ({ min }) => `Ton mot de passe doit contenir ${min} caractères minimum`
    )
    .matches(
      /^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Ton mot de passe doit contenir 1 majuscule, 1 minuscule et 1 chiffre'
    )
    .required('Ton mot de passe est requis'),
});

export { inscriptionValidationSchema, initialValue };
