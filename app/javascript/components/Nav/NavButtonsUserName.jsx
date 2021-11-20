import React from 'react';
import propTypes from 'prop-types';

const NavButtonsUserName = ({ email }) => <div className="nav_buttons_user_username">{email}</div>;

NavButtonsUserName.propTypes = {
  email: propTypes.string.isRequired,
};

export default NavButtonsUserName;
