/* eslint react/no-danger: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '../redux/selectors';
import { getNewsletter } from '../redux/newsletter/actions';
import * as status from '../redux/newsletter/status';

import './Newsletter.css';

class Newsletter extends Component {
  static propTypes = {
    className: PropTypes.string,
    newsletter: PropTypes.shape({
      shortTitle: PropTypes.string,
      shortDescription: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }
  static defaultProps = {
    className: null,
    newsletter: {
      shortTitle: null,
    },
  }
  static contextTypes = {
    store: PropTypes.object,
  }
  static mapStateToProps = state => ({
    loading: selectors.getNewsletterLoading(state),
    newsletter: selectors.getNewsletter(state),
  })
  componentDidMount() {
    this.fetchNewsletter(this.props.match.params.id);
  }
  async fetchNewsletter(id) {
    const { store } = this.context;
    const res = await store.dispatch(getNewsletter(id));
    if (res > status.NEWSLETTER_STATUS_OK) {
      await this.setStateAsync({
        message: 'An error occurred. Please refresh page.',
      });
    }
  }
  classNames(...classNames) {
    const names = [].concat(classNames.filter(c => !!c));
    if (this.props.className) {
      names.push(this.props.className);
    }
    return names.join(' ');
  }
  render() {
    const { newsletter } = this.props;
    return (
      <div className={this.classNames('Newsletter')}>
        <h1>{newsletter.shortTitle}</h1>
        <div className="view" dangerouslySetInnerHTML={{ __html: newsletter.embedIssuu }} />
        <div className="description">
          {newsletter.shortDescription}
        </div>
      </div>
    );
  }
}

export default connect(Newsletter.mapStateToProps)(Newsletter);
