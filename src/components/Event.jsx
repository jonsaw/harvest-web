import React from 'react';
import PropTypes from 'prop-types';

import { dateRange } from '../utils/date';
import getElementType from '../utils/getElementType';

import './Event.css';

const classNames = (...names) => names.filter(n => !!n).join(' ');

const Event = (props) => {
  const ElementType = getElementType(Event, props);
  return (
    <ElementType
      className={classNames(
        'Event',
        props.className,
        props.featured ? 'featured' : null,
        props.imageSrc050 ? 'with-image' : null,
      )}
    >
      <div className="header">
        <h3>{props.shortTitle}</h3>
      </div>
      <div className="date">
        {dateRange({
          startsAt: props.eventAt,
          endsAt: props.eventEndsAt || null,
          allDay: props.eventAllDay || false,
        })}
      </div>
      <p>{props.shortDescription}</p>
      <div className="location">
        {props.location}
      </div>
      {
        props.imageSrc050 &&
        <div
          className="image"
          style={{
            backgroundImage: `url(${props.imageSrc050})`,
            backgroundPosition: 'center center',
          }}
          alt={props.shortTitle}
        />
      }
    </ElementType>
  );
};

Event.propTypes = {
  eventAt: PropTypes.number,
  eventAllDay: PropTypes.bool,
  eventEndsAt: PropTypes.number,
  className: PropTypes.string,
  featured: PropTypes.bool,
  imageSrc050: PropTypes.string,
  location: PropTypes.string,
  shortTitle: PropTypes.string,
  shortDescription: PropTypes.string,
};

Event.defaultProps = {
  eventAt: null,
  eventAllDay: false,
  eventEndsAt: null,
  className: null,
  featured: false,
  imageSrc050: null,
  location: null,
  shortTitle: null,
  shortDescription: null,
};

export default Event;
