import { createSelector } from 'reselect';
import { NAME } from './config';

export const getSubstate = state => state[NAME];

export const getId = createSelector(
  getSubstate,
  user => user.id
);

export const getToken = createSelector(
  getSubstate,
  user => user.token
);

export const getEmail = createSelector(
  getSubstate,
  user => user.email
);

export const getName = createSelector(
  getSubstate,
  getEmail,
  (user, email) => user.name || email
);

export const getSubscriptionId = createSelector(
  getSubstate,
  user => user.subscriptionId
);

export const getAvatar = createSelector(
  getSubstate,
  user => user.profileImg
);
