/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import App from './containers/App';

const Root = ({ store, history }) => (
  <Provider className="Root" store={store}>
    <App history={history} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
