import { push } from 'react-router-redux';
import { getQuery, getPathname } from './selectors';

export const pushRoute = push;

export const pushPath = pathname => (dispatch, getState) => dispatch(push({
  pathname,
  query: getQuery(getState()),
}));

export const pushQuery = query => (dispatch, getState) => dispatch(push({
  pathname: getPathname(getState()),
  query,
}));
