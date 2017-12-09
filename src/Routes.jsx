/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import RouteApplied from './components/RouteApplied';

import {
  AsyncHome,
  AsyncConnect,
  AsyncEvents,
  AsyncNewsletters,
  AsyncNewsletter,
  AsyncVisit,
} from './RouteLoaders';

const Routes = ({ childProps }) => (
  <Switch>
    <RouteApplied path="/" exact component={AsyncHome} props={childProps} />
    <RouteApplied path="/connect" component={AsyncConnect} props={childProps} />
    <RouteApplied path="/events" component={AsyncEvents} props={childProps} />
    <RouteApplied path="/newsletters/:id" component={AsyncNewsletter} props={childProps} />
    <RouteApplied path="/newsletters" component={AsyncNewsletters} props={childProps} />
    <RouteApplied path="/visit" component={AsyncVisit} props={childProps} />
  </Switch>
);

Routes.propTypes = {
  childProps: PropTypes.object,
};

Routes.defaultProps = {
  childProps: null,
};

export default Routes;
