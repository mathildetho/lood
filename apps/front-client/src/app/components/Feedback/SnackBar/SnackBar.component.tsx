import React from 'react';
import Icon from '../../DataDisplay/Icon/Icon.component';
import { MessageError } from './SnackBarsWrapper.component';
import close from '../../../../assets/img/close.svg';
import './SnackBar.css';

export interface SnackBarProps {
  id?: string;
  className?: string;
  color?: string;
  message: MessageError;
  onClose?: () => void;
}

const SnackBar = (props: SnackBarProps) => {
  console.log('SnackBar', props);
  return (
    <div className="snackbar">
      <p className="snackbar__message">{props.message.message}</p>
      {props.onClose && (
        <button
          type="button"
          className="snackbar__button"
          onClick={() => {
            props.onClose();
          }}
        >
          <Icon className="snackbar__button-icon" path={close} />
        </button>
      )}
    </div>
  );
};

export default SnackBar;
