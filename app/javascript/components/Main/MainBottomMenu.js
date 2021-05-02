import { object } from "prop-types";
import React, { useContext } from "react"
import { MenuContext, NextMenuContext, NextMenuesContext } from '../View'

const MainBottomMenu = () => {
  const [menu, setMenu] = useContext(MenuContext);
  const [nextMenues, setNextMenues] = useContext(NextMenuesContext);
  const [nextMenu, setNextMenu] = useContext(NextMenuContext);

  const handleChange=(e)=>{
    setNextMenu(nextMenues[e.target.value]);
  }
  let searchResult = [];
  if (nextMenues.length != 0) {
    for (let num in nextMenues) {
      if (nextMenues[num].contract_type === menu.contract_type) {
        searchResult.push(
          <option value={num} key={nextMenues[num].id}>{nextMenues[num].name}</option>
        )
      }
    }
  }

  return (
    <>
      <div className="main_bottom_menu">
        <div className="main_bottom_menu_title">料金メニュー</div>
      </div>
      <div className="main_bottom_menu-list">
        <select name="menu" id="menu" onChange={handleChange}>
          <option value="">選択して下さい</option>
          {searchResult}
        </select>
      </div>
    </>
  );

}

export default MainBottomMenu
