import generateId from 'shortid';
import * as actionTypes from './actionTypes';

export const push = notification => ({
  type: actionTypes.PUSH,
  payload: { ...notification, uid: generateId() },
});

export const pop = uid => ({
  type: actionTypes.POP,
  payload: { uid },
});
