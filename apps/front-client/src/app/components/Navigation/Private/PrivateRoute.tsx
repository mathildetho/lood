import { ApolloError } from '@apollo/client';
import React from 'react';
import { connect } from 'react-redux';
import { StaticContext } from 'react-router';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import * as snackbarsActions from '../../../reducers/snackbar/actions';

const PrivateRoute = (props: {
  path: string;
  component:
    | React.ComponentType<unknown>
    | React.ComponentType<RouteComponentProps<unknown, StaticContext, unknown>>;
  addSnackbar: (
    icon: string,
    message: { message: string } | ApolloError,
    time: number
  ) => void;
}) => {
  const authToken = localStorage.getItem('token');

  if (!authToken) {
    // si pas connecté, redirection et snackbar d'indication
    props.addSnackbar(
      'warning',
      {
        message: 'Pour accéder à cette page, tu dois te connecter.',
      },
      3000
    );
    return <Redirect to="/se-connecter" />;
  }

  return <Route path={props.path} component={props.component} />;
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    addSnackbar: bindActionCreators(snackbarsActions.add, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(PrivateRoute);
