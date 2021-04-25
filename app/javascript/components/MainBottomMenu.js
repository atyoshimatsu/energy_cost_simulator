import React from "react"
import PropTypes from "prop-types"
class MainBottomMenu extends React.Component {
  handleChange=(e)=>{
    this.props.updateNextMenu({nextMenu: this.props.nextMenues[e.target.value]});
  }

  render () {
    let searchResult = [];
    let i = 0;
    if (this.props.nextMenues.length != 0) {
      this.props.nextMenues.forEach(menu=> {
        if (menu.contract_type == this.props.menu.contract_type) {
          searchResult.push(
            <option value={i} key={menu.id}>{menu.name}</option>
          )
        }
        i++;
      })
    }
    return (
      <React.Fragment>
        <div className="main_bottom_menu">
          <div className="main_bottom_menu_title">料金メニュー</div>
        </div>
        <div className="main_bottom_menu-list">
          <select name="menu" id="menu" onChange={this.handleChange}>
            <option value="">選択して下さい</option>
            {searchResult}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default MainBottomMenu
