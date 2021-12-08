import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const LoginPage = lazy(() => import("./Login/index"));
const UpdatePage = lazy(() => import("./Update"));

const UpdateAddressRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact={true} component={LoginPage} />
      <Route path={`${path}/update`} component={UpdatePage} />
    </Switch>
  );
};

export default UpdateAddressRoutes;
