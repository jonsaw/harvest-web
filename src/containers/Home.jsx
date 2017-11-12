import React from 'react';

import './Home.css';
import banner from '../assets/images/banner.png';

const Home = () => (
  <div className="Home">
    <nav>
      <ul>
        <li>Connect</li>
        <li>Events</li>
        <li>Newsletters</li>
      </ul>
    </nav>
    <div className="banner">
      <img alt="Banner" src={banner} />
    </div>
  </div>
);

export default Home;
