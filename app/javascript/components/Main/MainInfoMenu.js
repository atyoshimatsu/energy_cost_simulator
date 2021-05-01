import React, { useContext } from "react"
import { MenuContext, MenuesContext } from '../View'

const MainInfoMenu = () => {
const [menues, setMenues] =useContext(MenuesContext);
const [menu, setMenu] =useContext(MenuContext);

  const handleChange=(e)=>{
    setMenu(menues[e.target.value]);
  }

  let searchResult = [];
  let i = 0;
  if (menues.length != 0) {
    menues.forEach(menu => {
      searchResult.push(
        <option value={i} key={menu.id}>{menu.name}</option>
      )
      i++;
    });
  }

  return (
    <>
      <div className="main_info_menu">
        <div className="main_info_menu-title">料金メニュー</div>
      </div>
      <div className="main_info_menu-list">
        <select name="menu" id="menu" onChange={handleChange}>
          <option value="">選択して下さい</option>
          {searchResult}
        </select>
      </div>
    </>
  );
}

export default MainInfoMenu
