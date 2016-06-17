import { bindActionCreators } from 'redux';
import { mapValues, partial } from 'lodash';

const createPartials = (actions, args) => (
  mapValues(actions, action => partial(action, ...args))
);

const actionsShape = actions => ({ actions });

export default (actions, ...propKeys) => {
  if (propKeys.length) {
    return (dispatch, props) => () => {
      const args = propKeys.map(key => props[key]);
      return actionsShape(
        bindActionCreators(createPartials(actions, args), dispatch)
      );
    };
  }

  return dispatch => actionsShape(bindActionCreators(actions, dispatch));
};
