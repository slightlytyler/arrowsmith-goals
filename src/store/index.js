import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { getModuleAtoms } from 'helpers/modules';
import clearStoreWrapper from './clearStoreWrapper';
import rootReducer from 'reducers';
import * as modules from 'modules';
const { initializer: storage } = modules.storage;
const { initializer: router } = modules.router;

const reducer = compose(clearStoreWrapper, storage.wrapReducer)(rootReducer);

export default function configureStore(initialState = {}) {
  const middleware = applyMiddleware(
    thunkMiddleware,
    router.middleware,
    storage.middleware,
    ...getModuleAtoms(modules, 'middleware')
  );

  const store = compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore)(reducer, initialState);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  storage.load(store, () => {
    const { dispatch, getState } = store;
    getModuleAtoms(modules, 'hooks').forEach(hook => hook(dispatch, getState));
  });

  return store;
}
