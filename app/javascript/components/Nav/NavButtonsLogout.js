import React from "react"
import PropTypes from "prop-types"
class NavButtonsLogout extends React.Component {
  render () {
    return (
      <a href="/users/sign_out" className="nav_buttons_user_logout" data-method="delete">ログアウト</a>
    );
  }
}

export default NavButtonsLogout
