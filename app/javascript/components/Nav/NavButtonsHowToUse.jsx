import React from 'react';
import $ from 'jquery';

const NavButtonsHowToUse = () => {
  const onClick = () => {
    $('.sidebar').toggleClass('side-open');
    $('.overlay').toggleClass('is-open');
    $('.overlay, .sidebar_title_close').on('click', () => {
      $('.sidebar').removeClass('side-open');
      $('.overlay').removeClass('is-open');
    });
  };

  return (
    <div className="nav_buttons_config_howtouse" onClick={onClick()} role="button" tabIndex={0}>使い方</div>
  );
};

export default NavButtonsHowToUse;
