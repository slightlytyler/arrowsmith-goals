import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import { LOCAL_STORAGE_KEY } from 'config';
import { LOAD_COMPLETE } from './actionTypes';
import { CLEAR_STORE } from 'store/actionTypes';
import { NAME as userKey, actionTypes as userActionTypes } from 'modules/user';
import { actionTypes as routerActionTypes } from 'modules/router';

const persistentModuleKeys = [userKey];
const persistentActionTypes = [
  userActionTypes.authorize.success,
  userActionTypes.unauthorize.success,
];

const engine = filter(
  createEngine(LOCAL_STORAGE_KEY),
  persistentModuleKeys,
);

export const middleware = storage.createMiddleware(
  engine,
  [routerActionTypes.LOCATION_CHANGE],
  [
    CLEAR_STORE,
    ...persistentActionTypes,
  ],
);

export const wrapReducer = storage.reducer;

const loadStore = storage.createLoader(engine);
export const load = async (store, cb) => {
  await loadStore(store);
  cb();
  store.dispatch({ type: LOAD_COMPLETE });
};

