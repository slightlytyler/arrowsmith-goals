/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}] */

import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import Page from 'components/Page';
import { Root as Landing } from 'modules/landing';
import { SignUp, Login, Dashboard, Billing } from 'modules/user/components';
import { SelectPlan, Checkout } from 'modules/subscriptions/components';
import Editor from 'components/Editor';
import { Root as GoalsRoot } from 'modules/goals';
import { filters as goalsFilters } from 'modules/goals/constants';

export default (store) => (
  <Route path="/" component={Page}>
    <IndexRoute component={Landing} />
    <Route path="auth">
      <Route path="login" component={Login} />
      <Route path="sign-up" component={SignUp} />
    </Route>
    <Route path="projects" component={Editor}>
      <Route path=":projectId">
        <Route path="goals">
          <Route path="active" component={GoalsRoot} filter={goalsFilters.REMAINING_FILTER} />
          <Route path="complete" component={GoalsRoot} filter={goalsFilters.COMPLETED_FILTER} />
          <Route path="all" component={GoalsRoot} filter={goalsFilters.ALL_FILTER} />
        </Route>
      </Route>
    </Route>
    <Redirect from="start-subscription" to="start-subscription/select-plan" />
    <Route path="start-subscription">
      <Route path="select-plan" component={SelectPlan} />
      <Route path="checkout" component={Checkout} />
    </Route>
    <Route path="dashboard" component={Dashboard}>
      <Route path="user" />
      <Route path="billing" component={Billing} />
    </Route>
  </Route>
);
