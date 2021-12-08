import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const MilestonesListPage = lazy(() => import("./MilestonesList"));

const MilestonesRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact component={MilestonesListPage} />
    </Switch>
  )
}

export default MilestonesRoutes;
