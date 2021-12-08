import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ProposalsListPage = lazy(() => import("./ProposalsList"));
const ProposalVotePage = lazy(() => import("./ProposalVote"));
const ProposalCompliancePage = lazy(() => import("./ProposalCompliance"));

const ProposalsRoutes = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact component={ProposalsListPage} />
      <Route path={`${path}/:id/votes/:voteId`} exact component={ProposalVotePage} />
      <Route path={`${path}/:id/compliance`} exact component={ProposalCompliancePage} />
    </Switch>
  )
}

export default ProposalsRoutes;
