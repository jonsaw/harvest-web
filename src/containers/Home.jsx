import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as selectors from '../redux/selectors';
import { getEvents } from '../redux/events/actions';
import * as status from '../redux/events/status';

import Event from '../components/EventItem';
import LoadingPage from '../components/LoadingPage';

import './Home.css';
import arrowRight from '../assets/images/icons/arrow-right.svg';
import banner from '../assets/images/banner-colors.png';

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
    location: '2nd Floor, Hall A',
  },
  {
    name: 'TeenEdge',
    time: 'Saturdays at 5:00pm',
    location: 'Rooftop Sanctuary',
  },
];

class Home extends Component {
  static propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
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
  }
  static defaultProps = {
    className: null,
    loading: false,
    events: [],
  }
  static contextTypes = {
    store: PropTypes.object,
  }
  static mapStateToProps = state => ({
    loading: selectors.getEventsLoading(state),
    events: selectors.getEvents(state),
  })
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
  }
  componentDidMount() {
    this.fetchEvents();
  }
  getEvents() {
    return this.props.events.sort((a, b) => {
      if (a.eventAt > b.eventAt) {
        return 1;
      }
      if (a.eventAt < b.eventAt) {
        return -1;
      }
      return 0;
    }).slice(0, 4);
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
    const { className } = this.props;
    return (
      <div className={classNames('Home', className)}>
        {
          this.state.message &&
            <div className="prompt">{this.state.message}</div>
        }
        <nav>
          <ul>
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
        </nav>
        <div className="banner">
          <img alt="Banner" src={banner} />
        </div>
        <LoadingPage isLoading={this.props.loading} />
        <ul className="events">
          {this.getEvents().map(event => (
            <Event as="li" key={event.eventID} {...event} featured={false} />
          ))}
          <li className="more">
            <Link to="/events">
              <img src={arrowRight} alt="Show more" />
            </Link>
          </li>
        </ul>
        <ul className="services">
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
    );
  }
}

export default connect(Home.mapStateToProps)(Home);
