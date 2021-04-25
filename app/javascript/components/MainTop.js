import React from "react"
import PropTypes from "prop-types"
import MainTopTitle from "./MainTopTitle"
import MainTopCompany from "./MainTopCompany";

class MainTop extends React.Component {
  updateNextCompany(state){
    this.props.updateNextCompany({nextCompany: state.nextCompany});
  }
  updateNextMenues(state){
    this.props.updateNextMenues({nextMenues: state.nextMenues});
  }

  render () {
    return (
      <div className="main_top" id="main_top">
        <MainTopTitle />
        <MainTopCompany updateNextCompany={this.updateNextCompany.bind(this)} updateNextMenues={this.updateNextMenues.bind(this)} companies={this.props.companies} areaCode={this.props.areaCode} menu={this.props.menu} />
      </div>
      );
  }
}

export default MainTop
