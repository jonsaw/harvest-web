import React from 'react';
import PropTypes from 'prop-types';

import loader from '../assets/images/loader.svg';

import './LoadingPage.css';

const LoadingPage = ({ isLoading, error, errorMessage }) => {
  if (isLoading) {
    return (
      <div className="LoadingPage">
        <img src={loader} alt="Loading..." />
      </div>
    );
  }
  if (error) {
    return <div>{errorMessage}</div>;
  }
  return null;
};

LoadingPage.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  errorMessage: PropTypes.string,
};

LoadingPage.defaultProps = {
  isLoading: false,
  error: null,
  errorMessage: 'Sorry, there was a problem loading the page.',
};

export default LoadingPage;
