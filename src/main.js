import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import initialize from './initialize';
import configureStore from 'store';
import makeRoutes from 'routes';
import Root from 'containers/Root';
import { initializer as router } from 'modules/router';

initialize();

const store = configureStore();
const history = router.createHistory(store);
const routes = makeRoutes(store);

ReactDOM.render(
  <Root
    store={store}
    history={history}
    routes={routes}
  />,
  document.getElementById('root')
);
