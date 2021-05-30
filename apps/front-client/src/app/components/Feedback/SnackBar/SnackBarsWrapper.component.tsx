import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SnackBar from './SnackBar.component';
import * as snackbarsActions from '../../../reducers/snackbar/actions';
import './SnackBarsWrapper.css';

export interface MessageError {
  message: string;
}

// Gère les timers des snackbars et leurs transitions
const SnackBarsWrapper = (props: {
  snackbars: { key: string; message: MessageError }[];
  classNameAuth?: string;
  removeSnackbar: (key: string) => void;
}) => {
  // enlève les messages dupliqués
  const snackbars = props.snackbars.reduce((acc, current) => {
    const notDuplicate = acc.find((item) => item.message !== current.message);
    if (!notDuplicate) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <div className={`snackbars-wrapper ${props.classNameAuth}`}>
      {snackbars.map((snackbar: { key: string; message: MessageError }) => {
        return (
          <SnackBar
            key={snackbar.key}
            id={snackbar.key}
            onClose={() => {
              props.removeSnackbar(snackbar.key);
            }}
            message={snackbar.message}
          />
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    snackbars: Object.values(state.snackbars.stack),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSnackbar: bindActionCreators(snackbarsActions.remove, dispatch),
    stopTimerSnackbar: bindActionCreators(snackbarsActions.stopTimer, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarsWrapper);
