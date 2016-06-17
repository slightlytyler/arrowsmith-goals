import { createSelector } from 'reselect';
import {
  createGetAllRecordIdsSelector,
  createFindCollectionSelector,
  createFindRecordSelector,
} from 'helpers/selectors';
import { NAME } from './config';

export const getSubstate = state => state[NAME];

export const getCollections = createSelector(
  getSubstate,
  substate => substate.collections
);

export const getRecordsById = createSelector(
  getSubstate,
  substate => substate.recordsById,
);

export const findCollection = createFindCollectionSelector(getCollections);

export const findRecord = createFindRecordSelector(getRecordsById);

export const getAllRecordIds = createGetAllRecordIdsSelector(getRecordsById);
