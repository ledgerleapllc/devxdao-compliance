import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const AddressesListPage = lazy(() => import("./AddressesList"));

const AddressesRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact component={AddressesListPage} />
    </Switch>
  )
}

export default AddressesRoutes;
