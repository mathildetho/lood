import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loader from '../../../components/Feedback/Loader/Loader.component';
import PageLayout from '../../../components/Layout/PageLayout/PageLayout.component';
import { ACTIVATE_USER } from '../../../graphql/mutations/auth';

const InscriptionConfirmation = (props: {
  match: { params: { token: string } };
}) => {
  const history = useHistory();
  const [activationEnChargement, setActivationEnChargement] = useState(true);
  const [active, setActive] = useState(false);
  const [erreurActivation, setErreurActivation] = useState(false);

  const [activateUser] = useMutation(ACTIVATE_USER, {
    onCompleted: (res) => {
      console.log('onCompleted', res);
      const token = res?.activateUser?.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      setActivationEnChargement(false);
      setActive(true);
    },
    onError: (_err) => {
      setErreurActivation(true);
    },
  });

  useEffect(() => {
    // récupère le token dans l'url et active le compte
    activateUser({ variables: { token: props.match.params.token } });
  }, [activateUser, props.match.params.token]);

  useEffect(() => {
    // si l'activation est confirmée, l'utilisateur peut aller se connecter
    if (active) {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }, [active, history]);

  if (erreurActivation) {
    return (
      <PageLayout>
        <span className="--white --body-text inscription-confirmation__message">
          Une erreur est survenue lors de l'activation de ton compte, <br />
          essaies de rafraîchir ta page.
        </span>
      </PageLayout>
    );
  }

  if (!active) {
    return (
      <PageLayout>
        {activationEnChargement && (
          <Loader message="Activation de ton compte lood en cours..." />
        )}
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Loader />
    </PageLayout>
  );
};

export default InscriptionConfirmation;
