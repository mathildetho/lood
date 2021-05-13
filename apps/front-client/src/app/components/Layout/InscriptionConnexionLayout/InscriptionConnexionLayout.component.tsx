import React from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../PageLayout/PageLayout.component';
import Button from '../../Inputs/Button/Button.component';
import arrow from '../../../../assets/img/arrow.svg';

interface InscriptionConnexionLayoutProps {
  title: string;
  children: React.ReactNode;
}

const InscriptionConnexionLayout = (props: InscriptionConnexionLayoutProps) => {
  const history = useHistory();

  return (
    <PageLayout className={`sign ${props.img && 'layout--img'}`} classNameAuth="snackbars-wrapper--auth">
      <div>
        <Button
          className="button--back"
          classNameText="--white"
          text="Retour"
          leftIcon={arrow}
          classNameSVG="icon--revert"
          onClick={() => history.goBack()}
        />
        <h1 className="--h1 --white --margin-bottom-5">{props.title}</h1>
        {props.children}
      </div>
      {props.img && <img
          className="Home__content-img"
          src="#"
          alt="mise en situation de l'application lood"
        />}
    </PageLayout>
  );
};

export default InscriptionConnexionLayout;
