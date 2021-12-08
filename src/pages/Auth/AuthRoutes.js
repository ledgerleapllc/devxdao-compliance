import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const LoginPage = lazy(() => import("./Login"));

const AuthRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/login`} component={LoginPage} />
    </Switch>
  );
};

export default AuthRoutes;
