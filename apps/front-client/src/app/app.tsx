import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/HomeConnexion/Home';
import Inscription from './pages/auth/inscription/Inscription';

import '../assets/style/base.css';
import InscriptionConfirmation from './pages/auth/inscription/InscriptionConfirmation';
import Connexion from './pages/auth/connexion/Connexion';
import HomeLooder from './pages/home/HomeLooder/HomeLooder';
import PrivateRoute from './components/Navigation/Private/PrivateRoute';
import ForgotPassword from './pages/auth/forgotPassword/ForgotPassword';
import ReinitialisationPassword from './pages/auth/reinitialisationPassword/ReinitialisationPassword';

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
      <Route path="/mot-de-passe-oublie" component={ForgotPassword} />
      <Route
        path="/reinitialiser-mot-de-passe/:token"
        component={ReinitialisationPassword}
      />
      <PrivateRoute path="/looding" component={HomeLooder} />
    </Switch>
  );
}

export default App;
