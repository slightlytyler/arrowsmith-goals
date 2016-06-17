import * as actionTypes from './actionTypes';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.createRecord.success:
    case actionTypes.updateRecord.success:
    case actionTypes.fetchRecord.success:
    case actionTypes.authorize.success:
      return Object.assign({}, state, payload);

    case actionTypes.unauthorize.success:
      return {};

    default:
      return state;
  }
};
