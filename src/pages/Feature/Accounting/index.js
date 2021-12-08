import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const AccountingPage = lazy(() => import("./MainAccounting"));

const AccountingRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact component={AccountingPage} />
    </Switch>
  )
}

export default AccountingRoutes;
