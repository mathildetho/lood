import React from 'react';
import Button from '../../components/Inputs/Button/Button.component';
import './Home.css';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/Layout/PageLayout/PageLayout.component';

const Home = () => {
  const history = useHistory();

  return (
    <PageLayout>
      <div className="Home__content-text">
        <h1 className="--h1 --white --margin-bottom-5">
          Parce que manger, c'est sacré.
        </h1>
        <h2 className="--h2 --white --margin-bottom-5">
          lood vous aide à trouver votre âme soeur culinaire.
        </h2>
        <div style={{ width: '-webkit-fit-content' }}>
          <Button
            className="--bg-pink --margin-bottom-2"
            classNameText="--white"
            text="Créer un compte"
            onClick={() => history.push('/creer-un-compte')}
          />
          <Button
            className="--bg-white button--big"
            classNameText="--blue"
            text="Me connecter"
            onClick={() => history.push('/se-connecter')}
          />
        </div>
      </div>
      <img
        className="Home__content-img"
        src="#"
        alt="mise en situation de l'application lood"
      />
    </PageLayout>
  );
};

export default Home;
