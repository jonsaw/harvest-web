import React from 'react';
import PropTypes from 'prop-types';

import './LoadingPage.css';

const LoadingPage = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="LoadingPage">
        loading...
      </div>
    );
  }
  if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};

LoadingPage.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

LoadingPage.defaultProps = {
  isLoading: false,
  error: null,
};

export default LoadingPage;
