import React, { lazy, useEffect, Suspense } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Sidebar from '@shared/layouts/Sidebar';
import Header from '@shared/layouts/Header';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getGlobalSettings } from '@stores/auth/actions';
import IdleTimer from 'react-idle-timer';
import { logout } from '@stores/auth/actions';
import { useHistory } from 'react-router';

// const HomePage = lazy(() => import("./Home"));
const SettingsRoutes = lazy(() => import("./Settings"));
const ProposalsRoutes = lazy(() => import("./Proposals"));
const CompliancesRoutes = lazy(() => import("./Compliances"));
const AgreementsRoutes = lazy(() => import("./Agreements"));
const MilestonesRoutes = lazy(() => import("./Milestones"));
const AccountingRoutes = lazy(() => import("./Accounting"));
const InvoicesRoutes = lazy(() => import("./Invoices"));
const AddressesRoutes = lazy(() => import("./Addresses"));

const FeatureRoutes = () => {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer?.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getGlobalSettings());
    document.body.classList.add('bg-white1');
    return () => {
      document.body.classList.remove('bg-white1');
    }
  }, []);

  const handleOnAction = () => {
  }

  const handleOnActive = () => {
  }

  const handleOnIdle = (event) => {
    console.log('user is idle');
    dispatch(
      logout(
        () => {
          setTimeout(() => history.push('/auth/login'));
        },
        () => {}
      )
    )
  }

  return (
    <IdleTimer
      timeout={1000 * 60 * 15}
      onActive={handleOnActive}
      onIdle={handleOnIdle}
      onAction={handleOnAction}
      debounce={250}
    >
      <div className="flex">
        <Sidebar />
        <div className="h-screen flex flex-col flex-1 main-content bg-white1 px-12.5 pb-12.5 pt-8 min-w-0">
          <Header />
          <div className="flex-1 min-h-0">
            <Suspense fallback={<div className="bg-white1 h-full w-full" />}>
              {!!user?.is_super_admin && (
                <Switch>
                  <Route path={[`${path}/dashboard`, `${path}/proposals`]} component={ProposalsRoutes} />
                  <Route path={`${path}/compliances`} component={CompliancesRoutes} />
                  <Route path={`${path}/agreements`} component={AgreementsRoutes} />
                  <Route path={`${path}/milestones`} component={MilestonesRoutes} />
                  <Route path={`${path}/invoices`} component={InvoicesRoutes} />
                  <Route path={`${path}/accounting`} component={AccountingRoutes} />
                  <Route path={`${path}/addresses`} component={AddressesRoutes} />
                  <Route path={`${path}/settings`} component={SettingsRoutes} />
                  <Redirect from="/app" to="/app/dashboard" />
                </Switch>
              )}
              {!!user?.is_pa && (
                <Switch>
                  <Route path={[`${path}/dashboard`, `${path}/proposals`]} component={ProposalsRoutes} />
                  <Route path={`${path}/compliances`} component={CompliancesRoutes} />
                  <Route path={`${path}/agreements`} component={AgreementsRoutes} />
                  <Route path={`${path}/milestones`} component={MilestonesRoutes} />
                  <Route path={`${path}/invoices`} component={InvoicesRoutes} />
                  <Route path={`${path}/accounting`} component={AccountingRoutes} />
                  <Route path={`${path}/addresses`} component={AddressesRoutes} />
                  <Route path={`${path}/settings`} component={SettingsRoutes} />
                  <Redirect from="/app" to="/app/dashboard" />
                </Switch>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </IdleTimer>
  );
};

export default FeatureRoutes;
