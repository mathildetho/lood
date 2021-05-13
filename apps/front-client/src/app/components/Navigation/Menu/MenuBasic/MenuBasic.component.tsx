import React from 'react';
import logo from '../../../../../assets/img/monogramme-lood.svg';
import './MenuBasic.css';
import { useHistory } from 'react-router-dom';

const MenuBasic = () => {
  const history = useHistory();

  return (
    <div className="MenuBasic">
      <img
        className="MenuBasic__logo"
        src={logo}
        alt="Logo de l'application Lood"
        onClick={() => history.push('/')}
      />
    </div>
  );
};

export default MenuBasic;
