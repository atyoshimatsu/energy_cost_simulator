import React from "react"
import PropTypes from "prop-types"
import Logo from "/Users/atsuyuki/projects/energy_cost_simulator_react/app/assets/images/ecs_logo.png"

class NavTitleLogo extends React.Component {
  render () {
    return (
      <a href="/"><img width="50px" className="nav_title_logo" src={Logo}/></a>
    );
  }
}

export default NavTitleLogo
