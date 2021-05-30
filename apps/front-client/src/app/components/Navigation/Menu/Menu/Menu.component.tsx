import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../../../../../assets/img/monogramme-lood.svg';
import Icon from '../../../DataDisplay/Icon/Icon.component';
import Tab from '../../Tab/Tab.component';
import './Menu.css';

const Menu = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('/looding');
  useEffect(() => {
    setActiveTab(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <div className="menu">
      <div className="menu__icon-wrapper">
        <img
          className="menu__logo"
          src={logo}
          alt="Logo de l'application Lood"
          onClick={() => history.push('/looding')}
        />
      </div>
      <div className="menu__tabs">
        <Link to="/profil">
          <Tab
            className="menu__profil"
            img={logo}
            name="Profil"
            active={activeTab.includes('/profil')}
          />
        </Link>
        <Link to="/looders">
          <Tab
            className="menu__looders"
            img={logo}
            name="Looders"
            active={activeTab.includes('/looders')}
          />
        </Link>
        <Link to="/messages">
          <Tab
            className="menu__messages"
            img={logo}
            name="Messages"
            active={activeTab.includes('/messages')}
          />
        </Link>
        <Link to="/food">
          <Tab
            className="menu__food"
            img={logo}
            name="Food"
            active={activeTab.includes('/food')}
          />
        </Link>
      </div>
      <div className="menu__icon-wrapper">
        <Icon
          className="menu__deconnexion"
          onClick={() => {
            console.log('se deco');
            localStorage.removeItem('token');
            history.push('/se-connecter');
          }}
          path={logo}
        />
      </div>
    </div>
  );
};

export default Menu;
