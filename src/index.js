/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import './reset.css';
import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './redux/reducers';
import { configureStore } from './utils/redux';

const history = createBrowserHistory();
const store = configureStore(connectRouter(history)(rootReducer), {}, routerMiddleware(history));

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);
registerServiceWorker();
