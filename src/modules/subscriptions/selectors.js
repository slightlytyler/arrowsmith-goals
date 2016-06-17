import { createSelector } from 'reselect';
import { createGetAllRecordIdsSelector, createFindRecordSelector } from 'helpers/selectors';
import { NAME } from './config';

export const getSubstate = state => state[NAME];

export const getRecordsById = createSelector(
  getSubstate,
  substate => substate.recordsById
);

export const findRecord = createFindRecordSelector(getRecordsById);

export const getAllRecordIds = createGetAllRecordIdsSelector(getRecordsById);
