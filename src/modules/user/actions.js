import * as actionTypes from './actionTypes';
import * as service from './service';
import { getId } from './selectors';
import { actions as notificationActions } from 'modules/notifications';

export const createRecord = attrs => async dispatch => {
  dispatch({
    type: actionTypes.createRecord.pending,
  });

  try {
    const payload = await service.createRecord(attrs);

    dispatch({
      type: actionTypes.createRecord.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.createRecord.failure,
      payload: { error },
    });

    dispatch(notificationActions.push({
      message: `Could not create user. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const updateRecord = attrs => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.updateRecord.pending,
  });

  try {
    const payload = await service.updateRecord(getId(getState()), attrs);

    dispatch({
      type: actionTypes.updateRecord.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.updateRecord.failure,
      payload: { error },
    });

    dispatch(notificationActions.push({
      message: `Could not update user. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const fetchRecord = () => async dispatch => {
  dispatch({
    type: actionTypes.fetchRecord.pending,
  });

  try {
    const payload = await service.fetchRecord();

    dispatch({
      type: actionTypes.fetchRecord.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.fetchRecord.failure,
      payload: { error },
    });

    dispatch(notificationActions.push({
      message: `Could not fetch user. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const authorize = (email, password) => async dispatch => {
  dispatch({
    type: actionTypes.authorize.pending,
  });

  try {
    const payload = await service.authorize(email, password);

    dispatch({
      type: actionTypes.authorize.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.authorize.failure,
      payload: { error },
    });

    dispatch(notificationActions.push({
      message: `Could not authorize user. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const unauthorize = () => async dispatch => {
  dispatch({
    type: actionTypes.unauthorize.pending,
  });

  try {
    await service.unauthorize();

    dispatch({
      type: actionTypes.unauthorize.success,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.unauthorize.failure,
      payload: { error },
    });

    dispatch(notificationActions.push({
      message: `Could not unauthorize user. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const login = authorize;

export const logout = unauthorize;

export const signUp = payload => async dispatch => {
  await dispatch(createRecord(payload));
  dispatch(login(payload.email, payload.password));
};
