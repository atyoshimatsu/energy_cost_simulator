import React from 'react';

const MainTopTitle = () => {
  const onClickTo1 = () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: 'smooth',
    });
  };
  const onClickTo3 = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
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
