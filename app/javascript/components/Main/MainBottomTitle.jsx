import React from 'react';

const MainBottomTitle = () => {
  const onClickTo1 = () => {
    window.scrollBy({
      top: -window.innerHeight * 2,
      behavior: 'smooth',
    });
  };
  const onClickTo2 = () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="main_bottom_title">
      <div className="main_bottom_title_main">
        電気料金の比較
      </div>
      <div className="main_bottom_title_process">
        <div className="main_bottom_title_process_num page1" onClick={onClickTo1} onKeyPress={onClickTo1} role="button" tabIndex="-1">1</div>
        <div className="main_bottom_title_process_num page2" onClick={onClickTo2} onKeyPress={onClickTo2} role="button" tabIndex="0">2</div>
        <div className="main_bottom_title_process_this">3</div>
      </div>
    </div>
  );
};

export default MainBottomTitle;
