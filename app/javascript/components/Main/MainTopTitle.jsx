import React from 'react';

const MainTopTitle = () => {
  const onClickTo1 = () => {
    $('html, body').animate({ scrollTop: $('#main_info').offset().top - 50 }, 400, 'swing');
  };
  const onClickTo3 = () => {
    $('html, body').animate({ scrollTop: $('#main_bottom').offset().top - 50 }, 400, 'swing');
  };
  return (
    <div className="main_top_title">
      <div className="main_top_title_main">2. 比較する電力会社を選ぶ</div>
      <div className="main_top_title_process">
        <div className="main_top_title_process_num page1" onClick={onClickTo1} onKeyPress={onClickTo1} role="button" tabIndex="0">1</div>
        <div className="main_top_title_process_this">2</div>
        <div className="main_top_title_process_num page3" onClick={onClickTo3} onKeyPress={onClickTo3} role="button" tabIndex="0">3</div>
      </div>
    </div>
  );
};

export default MainTopTitle;
