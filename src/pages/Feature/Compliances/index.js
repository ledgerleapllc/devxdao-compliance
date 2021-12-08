import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const CompliancesListPage = lazy(() => import("./CompliancesList"));

const CompliancesRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact component={CompliancesListPage} />
    </Switch>
  )
}

export default CompliancesRoutes;
