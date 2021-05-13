import React, { ReactNode } from 'react';
import Icon from '../../DataDisplay/Icon/Icon.component';
import heartsLoader from '../../../../assets/img/hearts.svg';
import './Loader.css';

const Loader = (props: { message?: string | ReactNode }) => {
  return (
    <div className={`loader ${props.message && 'loader-message'}`}>
      <Icon path={heartsLoader} className="loader-icon" />
      {props.message && (
        <p className="--body-text --white loader-item">{props.message}</p>
      )}
    </div>
  );
};

export default Loader;
