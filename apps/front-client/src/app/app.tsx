import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Inscription from './pages/auth/inscription/Inscription';

import '../assets/style/base.css';
import InscriptionConfirmation from './pages/auth/inscription/InscriptionConfirmation';
import Connexion from './pages/auth/connexion/Connexion';

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/creer-un-compte" component={Inscription} />
      <Route path="/se-connecter" component={Connexion} />
      <Route
        path="/inscription/confirmation/:token"
        component={InscriptionConfirmation}
      />
    </Switch>
  );
}

export default App;
