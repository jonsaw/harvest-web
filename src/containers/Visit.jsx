import React from 'react';
import PropTypes from 'prop-types';

import './Visit.css';

const classNames = (...names) => names.filter(n => !!n).join(' ');

const Visit = ({
  className,
}) => (
  <div className={classNames('Visit', className)}>
    <h1>Visit</h1>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15936.563531624732!2d101.463428!3d3.056953!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6dae07813fba107!2sHarvest+Christian+Assembly!5e0!3m2!1sen!2smy!4v1482199094183"
      title="HCA Map"
      className="map"
      frameBorder="0"
      styles={{
        border: 0,
      }}
      allowFullScreen={false}
    />
    <ul className="details">
      <li className="location">
        <h3>Harvest Christian Assembly</h3>
        Lot 6934, Berkeley Complex,<br />
        Jalan Lang, Taman Berkeley,<br />
        41150 Klang, Selangor, Malaysia
      </li>
      <li className="mail">
        <a href="mailto:hello@harvestklang.com">
          hello@harvestklang.com
        </a>
      </li>
    </ul>
  </div>
);

Visit.propTypes = {
  className: PropTypes.string,
};

Visit.defaultProps = {
  className: null,
};

export default Visit;
