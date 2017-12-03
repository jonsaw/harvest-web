/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import RouteApplied from './components/RouteApplied';

import {
  AsyncHome,
  AsyncConnect,
  AsyncEvents,
} from './RouteLoaders';

const Routes = ({ childProps }) => (
  <Switch>
    <RouteApplied path="/" exact component={AsyncHome} props={childProps} />
    <RouteApplied path="/connect" component={AsyncConnect} props={childProps} />
    <RouteApplied path="/events" component={AsyncEvents} props={childProps} />
  </Switch>
);

Routes.propTypes = {
  childProps: PropTypes.object,
};

Routes.defaultProps = {
  childProps: null,
};

export default Routes;
