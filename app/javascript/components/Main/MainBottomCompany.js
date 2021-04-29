import React from "react"
import PropTypes from "prop-types"
class MainBottomCompany extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="main_bottom_company">比較する電力会社</div>
        <div className="main_bottom_company_name">{this.props.nextCompany.name}</div>
      </React.Fragment>
    );
  }
}

export default MainBottomCompany
