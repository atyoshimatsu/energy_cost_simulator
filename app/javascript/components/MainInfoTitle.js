import React from "react"
import PropTypes from "prop-types"
class MainInfoTitle extends React.Component {
  onClickTo2=()=>{
    $('html, body').animate({scrollTop:$('#main_top').offset().top - 50}, 400 , 'swing');
  }
  onClickTo3=()=>{
    $('html, body').animate({scrollTop:$('#main_bottom').offset().top - 50}, 400 , 'swing');
  }

  render () {
    return (
      <div className="main_info_title">
        <div className="main_info_title_main">1. 現在の契約情報</div>
        <div className="main_info_title_process">
          <div className="main_info_title_process_this">1</div>
          <div className="main_info_title_process_num page2" onClick={this.onClickTo2}>2</div>
          <div className="main_info_title_process_num page3" onClick={this.onClickTo3}>3</div>
        </div>
      </div>
    );
  }
}

export default MainInfoTitle
