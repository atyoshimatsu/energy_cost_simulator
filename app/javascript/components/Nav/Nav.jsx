import React from 'react';
import propTypes from 'prop-types';
import NavTitleLogo from './NavTitleLogo';
import NavTitle from './NavTitle';
import NavButtonsCsvImport from './NavButtonsCsvImport';
import NavButtonsHowToUse from './NavButtonsHowToUse';
import NavButtonsUserName from './NavButtonsUserName';
import NavButtonsLogout from './NavButtonsLogout';

const Nav = ({ user: { administrator, email } }) => (
  <>
    <div className="nav">
      <div className="nav_title">
        <NavTitleLogo />
        <NavTitle />
      </div>
      <div className="nav_buttons">
        <div className="nav_buttons_config">
          <NavButtonsCsvImport administrator={administrator} />
          <NavButtonsHowToUse />
        </div>
        <div className="nav_buttons_user">
          <NavButtonsUserName email={email} />
          <NavButtonsLogout />
        </div>
      </div>
    </div>
  </>
);

Nav.propTypes = {
  user: propTypes.shape({
    administrator: propTypes.bool.isRequired,
    email: propTypes.string.isRequired,
  }).isRequired,
};

export default Nav;
