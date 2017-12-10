import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '../redux/selectors';
import { getStaff } from '../redux/staff/actions';
import * as status from '../redux/staff/status';

import LoadingPage from '../components/LoadingPage';

import envelopeImage from '../assets/images/envelope.svg';
import './Connect.css';

class Connect extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    staff: PropTypes.arrayOf(PropTypes.shape({
      staffID: PropTypes.string,
      description: PropTypes.string,
      email: PropTypes.string,
      group: PropTypes.string,
      imageSrc050: PropTypes.string,
    })),
    className: PropTypes.string,
  };
  static defaultProps = {
    className: null,
    loading: false,
    staff: [],
  };
  static contextTypes = {
    store: PropTypes.object,
  };
  static groups = [
    'Pastoral Staff',
    'Administration',
    'Education',
  ];
  static mapStateToProps = state => ({
    loading: selectors.getStaffLoading(state),
    staff: selectors.getStaff(state),
  });
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
  }
  componentDidMount() {
    this.fetchStaff();
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  getStaff(group) {
    return this.props.staff
      .filter(s => s.group === group)
      .sort((a, b) => {
        if (a.position < b.position) {
          return -1;
        }
        if (a.position > b.position) {
          return 1;
        }
        return 0;
      });
  }
  classNames(...classNames) {
    const names = [].concat(classNames);
    if (this.props.className) {
      names.push(this.props.className);
    }
    return names.join(' ');
  }
  async fetchStaff() {
    const { store } = this.context;
    const res = await store.dispatch(getStaff());
    if (res > status.STAFF_STATUS_OK) {
      await this.setStateAsync({
        message: 'An error occurred. Please try again.',
      });
    }
  }
  renderStaff(group) {
    return (
      <ul className="list">
        {this.getStaff(group).map(staff => (
          <li className="staff" key={staff.staffID}>
            <div className="details">
              <div className="header">
                <h5>{staff.name}</h5>
              </div>
              <p className="description">{staff.description}</p>
              <div className="contact">
                <a href={`mailto:${staff.email}`} title={staff.email}>
                  <img src={envelopeImage} alt="Email envelope" />
                  {staff.email}
                </a>
              </div>
            </div>
            {
              staff.imageSrc050 ?
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${staff.imageSrc050})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '114px',
                    backgroundColor: '#ececec',
                  }}
                /> :
                <div className="image" />
            }
          </li>
        ))}
      </ul>
    );
  }
  renderGroups() {
    return (
      <ul className="groups">
        {Connect.groups.map(group => (
          <li key={group}>
            <h1>{group}</h1>
            {this.renderStaff(group)}
          </li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <div className={this.classNames('Connect')}>
        <LoadingPage isLoading={this.props.loading} />
        {
          this.state.message &&
          <p>{this.state.message}</p>
        }
        {
          !this.props.loading &&
          this.renderGroups()
        }
      </div>
    );
  }
}

export default connect(Connect.mapStateToProps)(Connect);
