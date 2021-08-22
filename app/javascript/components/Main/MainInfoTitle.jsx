import React from 'react';

const MainInfoTitle = () => {
  const onClickTo2 = () => {
    $('html, body').animate({ scrollTop: $('#main_top').offset().top - 50 }, 400, 'swing');
  };
  const onClickTo3 = () => {
    $('html, body').animate({ scrollTop: $('#main_bottom').offset().top - 50 }, 400, 'swing');
  };

  return (
    <div className="main_info_title">
      <div className="main_info_title_main">1. 現在の契約情報</div>
      <div className="main_info_title_process">
        <div className="main_info_title_process_this">1</div>
        <div className="main_info_title_process_num page2" onClick={onClickTo2} onKeyPress={onClickTo2} role="button" tabIndex="0">2</div>
        <div className="main_info_title_process_num page3" onClick={onClickTo3} onKeyPress={onClickTo2} role="button" tabIndex="-1">3</div>
      </div>
    </div>
  );
};

export default MainInfoTitle;
