import React from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../PageLayout/PageLayout.component';
import Button from '../../Inputs/Button/Button.component';
import arrow from '../../../../assets/img/arrow.svg';

interface InscriptionConnexionLayoutProps {
  title: string;
  children: React.ReactNode;
  img?: boolean;
  goHome?: boolean;
}

const InscriptionConnexionLayout = (props: InscriptionConnexionLayoutProps) => {
  const history = useHistory();

  return (
    <PageLayout
      className={`sign ${props.img && 'layout--img'}`}
      classNameAuth="snackbars-wrapper--auth"
      auth
    >
      <div className="Home__content-text" style={{ width: 'auto' }}>
        <Button
          className="button--back"
          classNameText="--white"
          text={props.goHome ? 'Accueil' : 'Retour'}
          leftIcon={arrow}
          classNameSVG="icon--revert"
          onClick={() => (props.goHome ? history.push('/') : history.goBack())}
        />
        <h1 className="--h1 --white --margin-bottom-5">{props.title}</h1>
        {props.children}
      </div>
      {props.img && (
        <img
          className="Home__content-img"
          src="#"
          alt="mise en situation de l'application lood"
        />
      )}
    </PageLayout>
  );
};

export default InscriptionConnexionLayout;
