import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const AgreementsListPage = lazy(() => import("./AgreementsList"));

const AgreementsRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact component={AgreementsListPage} />
    </Switch>
  )
}

export default AgreementsRoutes;
