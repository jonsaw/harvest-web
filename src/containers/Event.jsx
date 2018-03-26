/* eslint react/no-danger: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { dateRange } from '../utils/date';

import * as selectors from '../redux/selectors';
import { getEvent } from '../redux/event/actions';
import * as status from '../redux/event/status';

import './Event.css';

class Event extends Component {
  static propTypes = {
    className: PropTypes.string,
    event: PropTypes.shape({
      description: PropTypes.string,
      eventAt: PropTypes.number,
      eventAllDay: PropTypes.bool,
      eventEndsAt: PropTypes.number,
      imageSrc050: PropTypes.string,
      shortTitle: PropTypes.string,
      shortDescription: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
        eventAt: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };
  static defaultProps = {
    className: null,
    event: {
      eventAt: null,
      eventAllDay: false,
      eventEndsAt: null,
      shortTitle: null,
    },
  };
  static contextTypes = {
    store: PropTypes.object,
  };
  static mapStateToProps = state => ({
    loading: selectors.getEventLoading(state),
    event: selectors.getEvent(state),
  });
  componentDidMount() {
    this.fetchEvent(this.props.match.params.id, this.props.match.params.eventAt);
  }
  async fetchEvent(id, eventAt) {
    const { store } = this.context;
    const res = await store.dispatch(getEvent(id, eventAt));
    if (res > status.EVENT_STATUS_OK) {
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
    const { event } = this.props;
    return (
      <div className={this.classNames('Event')}>
        <h1>{event.shortTitle}</h1>
        <div className="details">
          {
            event.imageSrc050 &&
            <div
              className="image"
              style={{
                backgroundImage: `url(${event.imageSrc050})`,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '200px',
              }}
              alt={event.shortTitle}
            />
          }
          <ul className="content">
            <li className="date show-icon">
              {dateRange({
                startsAt: event.eventAt,
                endsAt: event.eventEndsAt || null,
                allDay: event.eventAllDay || false,
              })}
            </li>
            <li className="location show-icon">
              {event.location}
            </li>
            <li className="description">
              {
                event.description ?
                  <ReactMarkdown className="markdown" source={event.description} /> :
                  event.shortDescription
              }
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(Event.mapStateToProps)(Event);
