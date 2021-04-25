import React from "react"
import PropTypes from "prop-types"
class NavButtonsUserName extends React.Component {
  render () {
    return (
    <div className="nav_buttons_user-name">{this.props.user.email}</div>
    );
  }
}

export default NavButtonsUserName
