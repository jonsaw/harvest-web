/* eslint class-methods-use-this: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '../assets/images/harvestklang.svg';
import arrowUp from '../assets/images/icons/arrow-up.svg';
import arrowDown from '../assets/images/icons/arrow-down.svg';
import fbIcon from '../assets/images/icons/facebook.svg';
import instaIcon from '../assets/images/icons/instagram.svg';

import './AppFooter.css';

class AppFooter extends Component {
  static propTypes = {
    className: PropTypes.string,
    history: PropTypes.shape({
      listen: PropTypes.func,
    }).isRequired,
  }
  static defaultProps = {
    className: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      navOut: false,
      path: null,
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.unlisten = this.props.history.listen(this.onLocation);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    this.unlisten();
  }
  onScroll = () => {
    const top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    if (top > 60) {
      if (!this.state.navOut) {
        this.setState({ navOut: true });
      }
      return;
    }
    if (this.state.navOut) {
      this.setState({ navOut: false });
    }
  }
  onLocation = (location) => {
    if (location.pathname !== this.state.path) {
      window.scrollTo(0, 0);
      if (this.state.expand) {
        this.setState({
          expand: false,
        });
      }
    }
  }
  classNames(...classNames) {
    const names = [].concat(classNames);
    if (this.props.className) {
      names.push(this.props.className);
    }
    if (this.state.expand) {
      names.push('expanded');
    }
    if (this.state.navOut) {
      names.push('nav-out');
    }
    return names.join(' ');
  }
  toggleExpand = () => {
    this.setState({ expand: !this.state.expand });
  }
  renderSimple() {
    return (
      <ul className="social-simple">
        {
          !this.state.navOut && [
            <li key="1">
              <a href="https://www.facebook.com/harvestchristianassembly">
                <img src={fbIcon} alt="Facebook" />
              </a>
            </li>,
            <li key="2">
              <a href="https://www.instagram.com/harvestklang/">
                <img src={instaIcon} alt="Instagram" />
              </a>
            </li>,
          ]
        }
        {
          window.location.pathname !== '/visit' &&
          <li className="visit end">
            <Link to="/visit">Visit</Link>
          </li>
        }
      </ul>
    );
  }
  renderExpanded() {
    return (
      <div className="expanded-view">
        <div className="social">
          <div className="reach-us">
            <h5>Reach Us</h5>
            <ul>
              <li className="mail">
                <a href="mailto:hello@harvestklang.com">hello@harvestklang.com</a>
              </li>
              <li className="phone">
                <a href="tel:+60333433633">+603-3343 3633</a>
              </li>
              <li className="fax">
                <a href="tel:+60333452623">+603-3345 2623</a>
              </li>
            </ul>
          </div>
          <div className="follow-us">
            <h5>Follow Us</h5>
            <ul>
              <li className="facebook">
                <a href="https://www.facebook.com/harvestchristianassembly">Facebook</a>
              </li>
              <li className="instagram">
                <a href="https://www.instagram.com/harvestklang/">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <ul className="quick-nav">
          <li>
            <Link to="/connect">Connect</Link>
          </li>
          <li>
            <Link to="/events">Happenings</Link>
          </li>
          <li>
            <Link to="/newsletters">Inspire</Link>
          </li>
        </ul>
      </div>
    );
  }
  render() {
    return (
      <div className={this.classNames('AppFooter')}>
        <button className="expand-button" onClick={this.toggleExpand}>
          <img src={this.state.expand ? arrowDown : arrowUp} alt="Up" />
        </button>
        <div className="contents">
          <Link className="logo" to="/">
            <img src={logo} alt="Home" />
          </Link>
          {
            this.state.expand ? this.renderExpanded() : this.renderSimple()
          }
        </div>
      </div>
    );
  }
}

export default AppFooter;
