import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '../redux/selectors';
import { getEvents } from '../redux/events/actions';
import * as status from '../redux/events/status';

import Event from '../components/Event';
import LoadingPage from '../components/LoadingPage';

import './Events.css';

class Events extends Component {
  static propTypes = {
    className: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.shape({
      eventAt: PropTypes.number,
      eventAllDay: PropTypes.bool,
      eventEndsAt: PropTypes.number,
      eventID: PropTypes.string,
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
    events: [],
    loading: false,
  }
  static contextTypes = {
    store: PropTypes.object,
  };
  static mapStateToProps = state => ({
    loading: selectors.getEventsLoading(state),
    events: selectors.getEvents(state),
  });
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
  }
  componentDidMount() {
    this.fetchEvents();
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  classNames(...classNames) {
    const names = [].concat(classNames.filter(c => !!c));
    if (this.props.className) {
      names.push(this.props.className);
    }
    return names.join(' ');
  }
  async fetchEvents() {
    const { store } = this.context;
    const res = await store.dispatch(getEvents());
    if (res > status.EVENTS_STATUS_OK) {
      await this.setStateAsync({
        message: 'An error occurred. Please refresh page.',
      });
    }
  }
  render() {
    return (
      <div className={this.classNames('Events')}>
        <h1>Happenings</h1>
        <LoadingPage isLoading={this.props.loading} />
        {
          this.state.message &&
            <div className="prompt">{this.state.message}</div>
        }
        <ul>
          {this.props.events.map(event => (
            <Event as="li" key={event.eventID} {...event} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(Events.mapStateToProps)(Events);
