import { stripePlans } from 'config';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { actions as userActions, selectors as userSelectors } from 'modules/user';
import { actions as routeActions } from 'modules/router';

export const createRecord = (plan, card, address) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.createRecord.pending });

  try {
    const userId = userSelectors.getId(getState());
    const planId = stripePlans[plan];
    const payload = await service.createRecord(userId, planId, card, address);

    dispatch({
      type: actionTypes.createRecord.success,
      payload,
    });

    await dispatch(userActions.fetchRecord());

    dispatch(routeActions.pushRoute('/projects'));
  } catch (error) {
    dispatch({
      type: actionTypes.createRecord.failure,
      payload: { error },
    });
  }
};

export const fetchRecord = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.fetchRecord.pending });

  try {
    const { user } = getState();
    const payload = await service.fetchRecord(user.subscriptionId, user.id);

    dispatch({
      type: actionTypes.fetchRecord.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.fetchRecord.failure,
      payload: { error },
    });
  }
};
