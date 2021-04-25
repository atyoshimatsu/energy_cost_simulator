import React from "react"
import PropTypes from "prop-types"
class NavButtonsHowToUse extends React.Component {
  onClick = () => {
    $('.sidebar').toggleClass('side-open');
    $('.overlay').toggleClass('is-open');
    $('.overlay, .sidebar_title_close').on('click', function () {
      $('.sidebar').removeClass('side-open');
      $('.overlay').removeClass('is-open');
    });
  }

  render () {
    return (
      <div className="nav_buttons_howtouse" onClick={this.onClick}>使い方</div>
    );
  }
}

export default NavButtonsHowToUse
