/* eslint react/prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const RouteApplied = ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={props => <C {...props} {...cProps} />} />
);

RouteApplied.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

export default RouteApplied;
