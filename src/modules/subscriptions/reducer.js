import { combineReducers } from 'redux';
import { createRecordsByIdReducer } from 'helpers/reducers';
import * as actionTypes from './actionTypes';

export default combineReducers({
  recordsById: createRecordsByIdReducer(actionTypes),
});
