import * as actionTypes from './actionTypes';
import * as service from './service';
import { selectors as userSelectors } from 'modules/user';

export const updateRecord = (userId, card) => async dispatch => {
  dispatch({ type: actionTypes.updateRecord.pending });

  try {
    const payload = await service.updateRecord(userId, card);

    dispatch({
      type: actionTypes.updateRecord.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.updateRecord.failure,
      payload: { error },
    });
  }
};

export const fetchRecord = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.fetchRecord.pending });

  try {
    const payload = await service.fetchRecord(userSelectors.getId(getState()));

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
