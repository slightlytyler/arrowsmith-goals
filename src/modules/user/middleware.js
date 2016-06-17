import { authorize, unauthorize } from './actionTypes';
import { CLEAR_STORE } from 'store/actionTypes';
import { actions as routerActions } from 'modules/router';

export const handleAuth = store => next => action => {
  const result = next(action);
  const { type } = action;
  const { dispatch } = store;

  if (type === authorize.success) {
    dispatch(routerActions.pushRoute('/projects'));
  } else if (type === unauthorize.success) {
    dispatch(routerActions.pushRoute('/auth/login'));
    dispatch({ type: CLEAR_STORE });
  }

  return result;
};
