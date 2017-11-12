import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../assets/images/harvestklang.svg';

import './AppNavBar.css';

const AppNavBar = () => (
  <nav className="AppNavBar">
    <ul>
      <li>
        <Link to="/" className="logo">
          <img src={logo} alt="HCA" />
        </Link>
      </li>
    </ul>
  </nav>
);

export default AppNavBar;
