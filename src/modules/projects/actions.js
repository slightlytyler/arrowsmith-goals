import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import generateId from 'shortid';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { actions as notificationActions } from 'modules/notifications';
import { actions as routerActions } from 'modules/router';

export const viewRecord = (id: string) => routerActions.pushRoute(`/projects/${id}/goals/active`);

export const viewIndex = () => routerActions.pushRoute('/projects');

export const createRecord = (name: string): Function => async (dispatch: Function) => {
  const transactionId: string = generateId();
  const record = { name };

  dispatch({
    type: actionTypes.createRecord.pending,
    payload: {
      id: transactionId,
      ...record,
    },
    meta: {
      optimistic: { type: BEGIN, id: transactionId },
    },
  });

  try {
    const payload: Object = await service.createRecord(record);

    dispatch({
      type: actionTypes.createRecord.success,
      payload,
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });

    dispatch(viewRecord(payload.id));
  } catch (error) {
    dispatch({
      type: actionTypes.createRecord.failure,
      payload: { error },
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });

    dispatch(notificationActions.push({
      message: `Could not create project. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const updateRecord = (id: string, attrs: Object): Function => async (dispatch: Function) => {
  const transactionId: string = generateId();

  dispatch({
    type: actionTypes.updateRecord.pending,
    payload: { id, ...attrs },
    meta: {
      optimistic: { type: BEGIN, id: transactionId },
    },
  });

  try {
    const payload: Object = await service.updateRecord(id, attrs);

    dispatch({
      type: actionTypes.updateRecord.success,
      payload,
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.updateRecord.failure,
      payload: { error },
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });

    dispatch(notificationActions.push({
      message: `Could not update project. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const deleteRecord = (id: string, active: boolean) => async (dispatch: Function) => {
  const transactionId: string = generateId();

  dispatch({
    type: actionTypes.deleteRecord.pending,
    payload: { id },
    meta: {
      optimistic: { type: BEGIN, id: transactionId },
    },
  });

  if (active) dispatch(viewIndex());

  try {
    const payload: Object = await service.deleteRecord(id);

    dispatch({
      type: actionTypes.deleteRecord.success,
      payload,
      meta: {
        optimistic: { type: COMMIT, id: transactionId },
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.deleteRecord.failure,
      payload: { error },
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });

    dispatch(notificationActions.push({
      message: `Could not delete project. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const fetchCollection = (query: Object = { perPage: 10000 }) => async (dispatch: Function) => {
  dispatch({
    type: actionTypes.fetchCollection.pending,
    payload: { query },
  });

  try {
    const payload: Object = await service.fetchCollection(query);

    dispatch({
      type: actionTypes.fetchCollection.success,
      payload: { query, ids: payload.data },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.fetchCollection.failure,
      payload: { query },
    });

    dispatch(notificationActions.push({
      message: `Could not fetch project collection. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};
