import React, { useContext } from "react"
import { StateContext } from "../context/context";
import { MenuesContext } from '../View'

const MainInfoMenu = () => {
  const [state, setState] = useContext(StateContext);
  const [menues, setMenues] =useContext(MenuesContext);

  const handleChange=(e)=>{
    state.menu = menues[e.target.value];
    setState(menues[e.target.value]);
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
