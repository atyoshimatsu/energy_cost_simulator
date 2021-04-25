import React from "react"
import PropTypes from "prop-types"
class MainInfoUsage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      usages: [null, null, null, null, null, null, null, null, null, null, null, null],
      styles: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      alertFlag: 0,
    };
  }
  handleChange=(e, key)=>{
    const usages_copy = this.state.usages;
    const styles_copy = this.state.styles;

    usages_copy[key] = e.target.value;
    this.setState({usages: usages_copy});
    this.props.updateUsage({usages: this.state.usages});

    if (!/^[0-9]*$/.test(this.state.usages[key]) && this.state.usages[key] != null && this.state.usages[key] != "") {
      styles_copy[key] = {background: "lightcoral"};
      this.setState({styles: styles_copy}); 
    } else {
      styles_copy[key] = {};
      this.setState({styles: styles_copy}); 
    }

    this.setState((state) => {
      return {alertFlag: 0}
    });
    for (let i = 0; i < 12; i++) {
      if (!/^[0-9]*$/.test(this.state.usages[i]) && this.state.usages[i] != null && this.state.usages[i] != "") {
        this.setState(state => {
          return {alertFlag: state.alertFlag + 1}
        });
        break;
      } 
    }
  }

  onClickToTop=()=>{
    $('html, body').animate({scrollTop:$('#main_top').offset().top - 50}, 400 , 'swing');
  }


  render () {
    let alertMessage = "";
    if (this.state.alertFlag != 0) {
      alertMessage = (<div className="main_info_usage-title_alert">半角整数で入力して下さい</div>)
    }

    let nullCheck = true;
    let button = "";
    this.state.usages.forEach(usage => {
    if (usage != null && usage != ""){
        nullCheck = false;
      }
    });

    if ((["6", "7", "8"].indexOf(this.props.areaCode) == -1 && this.props.company != "" && this.props.menu !="" && this.props.kW != "" && this.props.areaCode != "" && this.state.alertFlag == 0 && nullCheck == false)
    || (["6", "7", "8"].indexOf(this.props.areaCode) != -1 && this.props.company != "" && this.props.menu !="" && this.props.areaCode != "" && this.state.alertFlag == 0 && nullCheck == false)) {
      button = (
        <div className="main_info_process_btn_to_top" onClick={this.onClickToTop} style={{background: "tomato"}}>次へ</div>
      );
    } else {
      button = (
        <div className="main_info_process_btn_to_top" style={{background: "darkgray", cursor: "default"}}>次へ</div>
      );
    }

    return (
      <React.Fragment>
        <div className="main_info_usage">
          <div className="main_info_usage-title">
            使用量(kWh)
          </div>
          {alertMessage}
        </div>
        <div className="main_info_usage-input">
          <div className="main_info_usage-input_monthly">
            <input className="main_info_usage-input_monthly_form" key="0" placeholder=" 4月の使用量" type="text" onChange={e => this.handleChange(e, 0)} style={this.state.styles[0]}/>
            <input className="main_info_usage-input_monthly_form" key="1" placeholder=" 5月の使用量" type="text" onChange={e => this.handleChange(e, 1)} style={this.state.styles[1]}/>
            <input className="main_info_usage-input_monthly_form" key="2" placeholder=" 6月の使用量" type="text" onChange={e => this.handleChange(e, 2)} style={this.state.styles[2]}/>
            <input className="main_info_usage-input_monthly_form" key="3" placeholder=" 7月の使用量" type="text" onChange={e => this.handleChange(e, 3)} style={this.state.styles[3]}/>
            <input className="main_info_usage-input_monthly_form" key="4" placeholder=" 8月の使用量" type="text" onChange={e => this.handleChange(e, 4)} style={this.state.styles[4]}/>
            <input className="main_info_usage-input_monthly_form" key="5" placeholder=" 9月の使用量" type="text" onChange={e => this.handleChange(e, 5)} style={this.state.styles[5]}/>
          </div>
          <div className="main_info_usage-input_monthly">
            <input className="main_info_usage-input_monthly_form" key="6" placeholder="10月の使用量" type="text" onChange={e => this.handleChange(e, 6)} style={this.state.styles[6]}/>
            <input className="main_info_usage-input_monthly_form" key="7" placeholder="11月の使用量" type="text" onChange={e => this.handleChange(e, 7)} style={this.state.styles[7]}/>
            <input className="main_info_usage-input_monthly_form" key="8" placeholder="12月の使用量" type="text" onChange={e => this.handleChange(e, 8)} style={this.state.styles[8]}/>
            <input className="main_info_usage-input_monthly_form" key="9" placeholder=" 1月の使用量" type="text" onChange={e => this.handleChange(e, 9)} style={this.state.styles[9]}/>
            <input className="main_info_usage-input_monthly_form" key="10" placeholder=" 2月の使用量" type="text" onChange={e => this.handleChange(e, 10)} style={this.state.styles[10]}/>
            <input className="main_info_usage-input_monthly_form" key="11" placeholder=" 3月の使用量" type="text" onChange={e => this.handleChange(e, 11)} style={this.state.styles[11]}/>
          </div>
        </div>
        {button}
      </React.Fragment>
    );
  }
}

export default MainInfoUsage
