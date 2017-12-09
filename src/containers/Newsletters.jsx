import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '../redux/selectors';
import { getNewsletters } from '../redux/newsletters/actions';
import * as status from '../redux/newsletters/status';

import Newsletter from '../components/Newsletter';
import LoadingPage from '../components/LoadingPage';

import './Newsletters.css';

class Newsletters extends Component {
  static propTypes = {
    className: PropTypes.string,
    newsletters: PropTypes.arrayOf(PropTypes.shape({
      createdAt: PropTypes.number,
      newsletterID: PropTypes.string,
      location: PropTypes.string,
      shortDescription: PropTypes.string,
      imageSrc050: PropTypes.string,
      shortTitle: PropTypes.string,
      featured: PropTypes.bool,
    })),
    loading: PropTypes.bool,
  }
  static defaultProps = {
    className: null,
    newsletters: [],
    loading: false,
  }
  static contextTypes = {
    store: PropTypes.object,
  };
  static mapStateToProps = state => ({
    loading: selectors.getNewslettersLoading(state),
    newsletters: selectors.getNewsletters(state),
  });
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
  }
  componentDidMount() {
    this.fetchNewsletters();
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  getNewsletters() {
    return this.props.newsletters.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      return 0;
    });
  }
  classNames(...classNames) {
    const names = [].concat(classNames.filter(c => !!c));
    if (this.props.className) {
      names.push(this.props.className);
    }
    return names.join(' ');
  }
  async fetchNewsletters() {
    const { store } = this.context;
    const res = await store.dispatch(getNewsletters());
    if (res > status.NEWSLETTERS_STATUS_OK) {
      await this.setStateAsync({
        message: 'An error occurred. Please refresh page.',
      });
    }
  }
  render() {
    return (
      <div className={this.classNames('Newsletters')}>
        <h1>Newsletters</h1>
        <LoadingPage isLoading={this.props.loading} />
        {
          this.state.message &&
            <div className="prompt">{this.state.message}</div>
        }
        <ul>
          {this.getNewsletters().map(newsletter => (
            <Newsletter as="li" key={newsletter.newsletterID} {...newsletter} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(Newsletters.mapStateToProps)(Newsletters);
