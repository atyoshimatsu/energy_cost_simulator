import React from "react"
import PropTypes from "prop-types"
import NavTitleLogo from "./NavTitleLogo"
import NavTitle from "./NavTitle"
import NavButtonsCsvImport from "./NavButtonsCsvImport";
import NavButtonsHowToUse from "./NavButtonsHowToUse";
import NavButtonsUserName from "./NavButtonsUserName";
import NavButtonsLogout from "./NavButtonsLogout";

class Nav extends React.Component {
  render () {
    return (
      <div className="nav">
        <div className="nav_title">
          <NavTitleLogo />
          <NavTitle />
        </div>
        <div className="nav_buttons">
          <div className="nav_buttons_config">
            <NavButtonsCsvImport user={this.props.user}/>
            <NavButtonsHowToUse />
          </div>
          <div className="nav_buttons_user">
            <NavButtonsUserName user={this.props.user}/>
            <NavButtonsLogout />
          </div>
        </div>
      </div>
    );
  }
}

export default Nav
