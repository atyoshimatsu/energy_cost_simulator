import React from "react"
import PropTypes from "prop-types"
import MainInfoTitle from "./MainInfoTitle"
import MainInfoCompany from "./MainInfoCompany"
import MainInfoArea from "./MainInfoArea"
import MainInfoMenu from "./MainInfoMenu"
import MainInfoContract from "./MainInfoContract"
import MainInfoUsage from "./MainInfoUsage"

class MainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      areaCode: "",
      menu: [],
      menues: [],
      kW: "",
      usages: [],
    };
  }

  updateCompany(state){
    this.setState({company: state.company});
    this.props.updateCompany(state);
  }
  updateArea(state){
    this.setState({areaCode: state.areaCode});
    this.props.updateArea(state);
  }
  updateMenu(state){
    this.setState({menu: state.menu});
    this.props.updateMenu(state);
  }
  updateMenues(state){
    this.setState({menues: state.menues});
  }
  updateKW(state){
    this.setState({kW: state.kW});
    this.props.updateKW(state);
  }
  updateUsage(state){
    this.setState({usages: state.usages});
    this.props.updateUsage(state);
  }
  render () {
    return (
      <div className="main_info" id="main_info">
        <MainInfoTitle />
        <form>
          <MainInfoCompany areaCode={this.state.areaCode} updateCompany={this.updateCompany.bind(this)} updateMenues={this.updateMenues.bind(this)} />
          <MainInfoArea company={this.state.company} updateArea={this.updateArea.bind(this)} updateMenues={this.updateMenues.bind(this)} />
          <MainInfoMenu areaCode={this.state.areaCode} menues={this.state.menues} updateMenu={this.updateMenu.bind(this)}  />
          <MainInfoContract contractType={this.state.menu.contract_type} updateKW={this.updateKW.bind(this)} areaCode={this.state.areaCode} />
          <MainInfoUsage updateUsage={this.updateUsage.bind(this)} company={this.state.company} areaCode={this.state.areaCode} menu={this.state.menu} kW={this.state.kW}
          usages={this.state.usages} />
        </form>
      </div>
      );
  }
}

export default MainInfo
