import React from "react"
import PropTypes from "prop-types"
class NavButtonsCsvImport extends React.Component {
  render () {
    let button = [];
    if (this.props.user.administrator == true){
      button = (
        <div className="nav_buttons_csv-import" data-target="#importModal" data-toggle="modal" data-backdrop="true">config</div>
      )
    } 
    return (
    <div>{button}</div>
    )
  }
}

export default NavButtonsCsvImport
