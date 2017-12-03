import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Home.css';
import banner from '../assets/images/banner.png';

const classNames = (...names) => names.filter(n => !!n).join(' ');

const Home = ({
  className,
}) => (
  <div className={classNames('Home', className)}>
    <nav>
      <ul>
        <li>
          <Link to="/connect">Connect</Link>
        </li>
        <li>
          <Link to="/events">Happenings</Link>
        </li>
        <li>
          <Link to="/">Inspire</Link>
        </li>
      </ul>
    </nav>
    <div className="banner">
      <img alt="Banner" src={banner} />
    </div>
  </div>
);

Home.propTypes = {
  className: PropTypes.string,
};

Home.defaultProps = {
  className: null,
};

export default Home;
