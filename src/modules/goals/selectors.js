import { createSelector, defaultMemoize as memoize } from 'reselect';
import {
  createGetAllRecordIdsSelector,
  createFindCollectionSelector,
  createFindRecordSelector,
} from 'helpers/selectors';
import { NAME } from './config';
import { filters } from './constants';

export const getSubstate = state => state[NAME];

export const getCollections = createSelector(
  getSubstate,
  substate => substate.collections
);

export const getRecordsById = createSelector(
  getSubstate,
  substate => substate.recordsById,
);

export const getCurrentQuery = createSelector(
  getSubstate,
  substate => substate.currentQuery
);

export const findCollection = createFindCollectionSelector(getCollections);

export const findCurrentCollection = memoize(
  state => findCollection(state, getCurrentQuery(state))
);

export const findRecord = createFindRecordSelector(getRecordsById);

export const getAllRecordIds = createGetAllRecordIdsSelector(getRecordsById);

export const getRemainingCollectionIds = memoize((recordsById, collectionIds) => (
  collectionIds.filter(id => !recordsById[id].complete)
));

export const getCompletedCollectionIds = memoize((recordsById, recordIds) => (
  recordIds.filter(id => recordsById[id].complete)
));

export const getFilteredCollectionIds = createSelector(
  getRecordsById,
  (state, collectionIds) => collectionIds,
  (state, collectionIds, activeFilter) => activeFilter,
  (recordsById, collectionIds, activeFilter) => {
    switch (activeFilter) {
      case filters.REMAINING_FILTER:
        return getRemainingCollectionIds(recordsById, collectionIds);

      case filters.COMPLETED_FILTER:
        return getCompletedCollectionIds(recordsById, collectionIds);

      case filters.ALL_FILTER:
      default:
        return collectionIds;
    }
  }
);

export const getRecordIdsByProject = memoize((recordsById, recordIds, projectId) => (
  recordIds.filter(id => recordsById[id].projectId === projectId)
));
