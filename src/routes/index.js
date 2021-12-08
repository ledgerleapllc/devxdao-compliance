import React, { lazy, Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import FeatureRoute from './FeatureRoute';
import UpdateAddressRoute from './UpdateAddressRoute';

const FeatureRoutes = lazy(() => import("../pages/Feature/FeatureRoutes"));
const AuthRoutes = lazy(() => import("../pages/Auth/AuthRoutes"));
const UpdateAddressRoutes = lazy(() => import("../pages/UpdateAddress/UpdateAddressRoutes"));

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <AuthRoute path="/auth" component={AuthRoutes} />
        <FeatureRoute path="/app" component={FeatureRoutes} />
        <UpdateAddressRoute path="/updateaddress" component={UpdateAddressRoutes} />
        <Redirect from="*" to="/app" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
