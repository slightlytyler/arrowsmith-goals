import { findIndex, isEqual, without } from 'lodash';
import { assoc } from 'react-update-in';
import { shape as apiActionsShape } from 'api/methods';

const currentColletionIndex = (collections, query) => (
  findIndex(collections, c => isEqual(c.query, query))
);

// Create reducer for handling collections of remote records
export default moduleActionTypes => (state = [], { type, payload, meta = {} }) => {
  const actionTypes = { ...apiActionsShape, ...moduleActionTypes };

  switch (type) {
    case actionTypes.createRecord.pending:
    case actionTypes.createRecord.success: {
      const index = currentColletionIndex(state, meta.currentQuery);

      if (index !== -1) {
        const currentCollection = state[index];

        return assoc(state, index, {
          ...currentCollection,
          ids: [...currentCollection.ids, payload.id],
        });
      }

      return state;
    }

    case actionTypes.deleteRecord.pending: {
      return state.map(collection =>
        assoc(collection, 'ids', without(collection.ids, payload.id))
      );
    }

    case actionTypes.fetchCollection.pending: {
      const index = currentColletionIndex(state, payload.query);

      if (index !== -1) {
        return assoc(state, index, {
          ...state[index],
          loading: true,
        });
      }

      return [...state, {
        query: payload.query,
        loading: true,
        ids: [],
      }];
    }

    case actionTypes.fetchCollection.success: {
      const index = currentColletionIndex(state, payload.query);
      const pagination = payload.pagination
        ? {
          totalElements: payload.pagination.totalElements,
          totalPages: payload.pagination.totalPages,
        }
        : {};

      return assoc(state, index, {
        ...state[index],
        loading: false,
        ids: payload.ids.map(record => record.id),
        ...pagination,
      });
    }

    default:
      return state;
  }
};
