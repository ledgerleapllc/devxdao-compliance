import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '@shared/core/services/auth';

const FeatureRoute = ({ component: Component, ...rest }) => {
  const token = getToken();

  return token ? (
    <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/auth/login" />
  );
};

export default FeatureRoute;
