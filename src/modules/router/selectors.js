import { createSelector } from 'reselect';

export const getSubstate = state => state.router.locationBeforeTransitions;

export const getQuery = createSelector(
  getSubstate,
  substate => substate.query
);

export const getPathname = createSelector(
  getSubstate,
  substate => substate.pathname
);
