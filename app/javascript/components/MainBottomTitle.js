import React from "react"
import PropTypes from "prop-types"
class MainBottomTitle extends React.Component {
  onClickTo1=()=>{
    $('html, body').animate({scrollTop:$('#main_info').offset().top - 50}, 400 , 'swing');
  }
  onClickTo2=()=>{
    $('html, body').animate({scrollTop:$('#main_top').offset().top - 50}, 400 , 'swing');
  }

  render () {
    return (
      <div className="main_bottom_title">
        <div className="main_bottom_title_main">
          電気料金の比較
        </div>
        <div className="main_bottom_title_process">
          <div className="main_bottom_title_process_num page1" onClick={this.onClickTo1}>1</div>
          <div className="main_bottom_title_process_num page2" onClick={this.onClickTo2}>2</div>
          <div className="main_bottom_title_process_this">3</div>
        </div>
      </div>
    );
  }
}

export default MainBottomTitle
