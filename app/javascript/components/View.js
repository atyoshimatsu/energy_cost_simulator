import React from "react"
import PropTypes from "prop-types"
import Nav from "./Nav"
import MainInfo from "./MainInfo"
import MainTop from "./MainTop"
import MainBottom from "./MainBottom"
import Sidebar from "./Sidebar"

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      areaCode: "",
      menu: "",
      kW: "",
      usages: [],
      nextCompany: "",
      nextMenues: [],
    };
  }

  updateCompany(state){
    this.setState({company: state.company});
  }
  updateArea(state){
    this.setState({areaCode: state.areaCode});
  }
  updateMenu(state){
    this.setState({menu: state.menu});
  }
  updateKW(state){
    this.setState({kW: state.kW});
  }
  updateUsage(state){
    this.setState({usages: state.usages});
  }
  updateNextCompany(state){
    this.setState({nextCompany: state.nextCompany});
  }
  updateNextMenues(state){
    this.setState({nextMenues: state.nextMenues});
  }

  render () {
    return (
      <div className="view">
        <Nav user={this.props.user} />
        <div className="wrapper">
          <div className="main">
            <MainInfo updateCompany={this.updateCompany.bind(this)} updateArea={this.updateArea.bind(this)} updateMenu={this.updateMenu.bind(this)}
            updateKW={this.updateKW.bind(this)} updateUsage={this.updateUsage.bind(this)} />
            <MainTop updateNextCompany={this.updateNextCompany.bind(this)} updateNextMenues={this.updateNextMenues.bind(this)} companies={this.props.companies} areaCode={this.state.areaCode} menu={this.state.menu} />
            <MainBottom kW={this.state.kW} areaCode={this.state.areaCode} usages={this.state.usages} company={this.state.company} nextCompany={this.state.nextCompany} 
            menu={this.state.menu} nextMenues={this.state.nextMenues}/>
          </div>
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default View
