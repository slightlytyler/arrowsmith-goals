import { createSelector } from 'reselect';
import { NAME } from './config';

export const getSubstate = state => state[NAME];

export const getRecordsById = createSelector(
  getSubstate,
  substate => substate.recordsById
);

export const recordIdsSelector = createSelector(
  getRecordsById,
  recordsById => Object.keys(recordsById)
);

export const findRecord = createSelector(
  getRecordsById,
  (state, id) => id,
  (recordsById, id) => recordsById[id]
);
