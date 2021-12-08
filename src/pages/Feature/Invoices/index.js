import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const InvoicesListPage = lazy(() => import("./InvoicesList"));

const InvoicesRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact component={InvoicesListPage} />
    </Switch>
  )
}

export default InvoicesRoutes;
