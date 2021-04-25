import React from "react"
import PropTypes from "prop-types"
class MainInfoMenu extends React.Component {
  handleChange=(e)=>{
    this.props.updateMenu({menu: this.props.menues[e.target.value]});
  }
  render () {
    let searchResult = [];
    let i = 0;
    if (this.props.menues.length != 0) {
      this.props.menues.forEach(menu => {
        searchResult.push(
          <option value={i} key={menu.id}>{menu.name}</option>
        )
        i++;
      });
    }

    return (
      <React.Fragment>
        <div className="main_info_menu">
          <div className="main_info_menu-title">料金メニュー</div>
        </div>
        <div className="main_info_menu-list">
          <select name="menu" id="menu" onChange={this.handleChange}>
            <option value="">選択して下さい</option>
            {searchResult}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default MainInfoMenu
