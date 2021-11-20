import React from 'react';

const MainInfoTitle = () => {
  const onClickTo2 = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  const onClickTo3 = () => {
    window.scrollBy({
      top: window.innerHeight * 2,
      behavior: 'smooth',
    });
  };

  return (
    <div className="main_info_title">
      <div className="main_info_title_main">1. 現在の契約情報</div>
      <div className="main_info_title_process">
        <div className="main_info_title_process_this">1</div>
        <div
          className="main_info_title_process_num page2"
          onClick={onClickTo2}
          onKeyPress={onClickTo2}
          role="button"
          tabIndex="0"
        >
          2
        </div>
        <div
          className="main_info_title_process_num page3"
          onClick={onClickTo3}
          onKeyPress={onClickTo2}
          role="button"
          tabIndex="-1"
        >
          3
        </div>
      </div>
    </div>
  );
};

export default MainInfoTitle;
