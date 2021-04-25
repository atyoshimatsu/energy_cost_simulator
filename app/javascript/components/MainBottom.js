import React from "react"
import PropTypes from "prop-types"
import MainBottomTitle from "./MainBottomTitle"
import MainBottomCompany from "./MainBottomCompany"
import MainBottomMenu from "./MainBottomMenu"
import MainBottomChart from "./MainBottomChart"

class MainBottom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nextMenu: "",
    };
  }
  updateNextMenu(state){
    this.setState({nextMenu: state.nextMenu});
  }

  render () {
    return (
      <div className="main_bottom" id="main_bottom">
        <MainBottomTitle />
        <MainBottomCompany nextCompany={this.props.nextCompany} />
        <MainBottomMenu nextCompany={this.props.nextCompany} areaCode={this.props.areaCode} updateNextMenu={this.updateNextMenu.bind(this)} menu={this.props.menu} nextMenues={this.props.nextMenues} />
        <MainBottomChart usages={this.props.usages} kW={this.props.kW} menu={this.props.menu} company={this.props.company} nextCompany={this.props.nextCompany} areaCode={this.props.areaCode} nextMenu={this.state.nextMenu} />
      </div>
    );
  }
}

export default MainBottom
