/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import RouteApplied from './components/RouteApplied';

import {
  AsyncHome,
} from './RouteLoaders';

const Routes = ({ childProps }) => (
  <Switch>
    <RouteApplied path="/" exact component={AsyncHome} props={childProps} />
  </Switch>
);

Routes.propTypes = {
  childProps: PropTypes.object,
};

Routes.defaultProps = {
  childProps: null,
};

export default Routes;
