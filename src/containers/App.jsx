/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';

import Routes from '../Routes';

import AppNavBar from '../components/AppNavBar';

import './App.css';

const App = ({ history }) => {
  const childProps = {
    className: 'App-contents',
  };
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <div className="wrapper">
          <AppNavBar />
          <Routes childProps={childProps} />
        </div>
      </ConnectedRouter>
    </div>
  );
};

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
