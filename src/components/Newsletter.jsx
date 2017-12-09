import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import getElementType from '../utils/getElementType';

import './Newsletter.css';

const classNames = (...names) => names.filter(n => !!n).join(' ');

const Newsletter = (props) => {
  const ElementType = getElementType(Newsletter, props);
  return (
    <ElementType
      className={classNames(
        'Newsletter',
        props.className,
        props.featured ? 'featured' : null,
        props.imageSrc050 ? 'with-image' : null,
      )}
    >
      <Link to={`/newsletters/${props.newsletterID}`}>
        <div className="header">
          <h3>{props.shortTitle}</h3>
        </div>
        <div className="date">
          {moment(props.createdAt).format('MMM YYYY')}
        </div>
        <p>{props.shortDescription}</p>
        <div className="read">
          Read
        </div>
        {
          props.imageSrc050 &&
          <div
            className="image"
            style={{
              backgroundImage: `url(${props.imageSrc050})`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: props.featured ? '400px' : '220px',
              backgroundColor: '#ececec',
            }}
            alt={props.shortTitle}
          />
        }
        <div className="hover">
          <div className="button">Read Newsletter</div>
        </div>
      </Link>
    </ElementType>
  );
};

Newsletter.propTypes = {
  createdAt: PropTypes.number,
  className: PropTypes.string,
  featured: PropTypes.bool,
  imageSrc050: PropTypes.string,
  newsletterID: PropTypes.string,
  shortTitle: PropTypes.string,
  shortDescription: PropTypes.string,
};

Newsletter.defaultProps = {
  createdAt: null,
  className: null,
  featured: false,
  imageSrc050: null,
  newsletterID: null,
  shortTitle: null,
  shortDescription: null,
};

export default Newsletter;
