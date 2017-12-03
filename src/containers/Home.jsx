import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Home.css';
import banner from '../assets/images/banner.png';

const classNames = (...names) => names.filter(n => !!n).join(' ');

const services = [
  {
    name: 'English Service',
    time: 'Sundays at 10:30am',
    location: 'Main Sanctuary',
  },
  {
    name: 'Tamil Service',
    time: 'Sundays at 11:30am',
    location: 'Rooftop Sanctuary',
  },
  {
    name: 'Chinese Service',
    time: 'Saturdays at 8:00pm',
    location: 'Rooftop Sanctuary',
  },
];

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
    <div className="services">
      <ul>
        {
          services.map(service => (
            <li key={service.name} className="service">
              <h5>{service.name}</h5>
              <ul>
                <li>{service.time}</li>
                <li>{service.location}</li>
              </ul>
            </li>
          ))
        }
      </ul>
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
