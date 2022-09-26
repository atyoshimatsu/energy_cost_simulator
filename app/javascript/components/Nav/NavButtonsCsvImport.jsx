import React from 'react';
import propTypes from 'prop-types';

const NavButtonsCsvImport = ({ administrator }) => {
  let button = [];
  if (administrator === true) {
    button = (
      <div
        className="nav_buttons_config_csv-import"
        data-target="#importModal"
        data-toggle="modal"
        data-backdrop="true"
      >
        config
      </div>
    );
  }
  return <div>{button}</div>;
};

NavButtonsCsvImport.propTypes = {
  administrator: propTypes.bool.isRequired,
};

export default NavButtonsCsvImport;
