import { createAsyncActionTypeSet } from 'helpers/actionTypes';
import { NAME } from './config';

export const createRecord = createAsyncActionTypeSet(NAME, 'CREATE_RECORD');

export const updateRecord = createAsyncActionTypeSet(NAME, 'UPDATE_RECORD');

export const deleteRecord = createAsyncActionTypeSet(NAME, 'DELETE_RECORD');

export const fetchRecord = createAsyncActionTypeSet(NAME, 'FETCH_RECORD');
