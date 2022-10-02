import React, { useContext } from 'react';
import { stateContext } from '../context/context';

const MainBottomMenu = () => {
  const [state, setState] = useContext(stateContext);

  const handleChange = (e) => {
    setState({ ...state, nextMenu: state.nextMenues[e.target.value] });
  };

  let searchResult = [];
  if (state.nextMenues.length !== 0) {
    searchResult = state.nextMenues
      .map((nextMenu, index) => {
        if (nextMenu.contract_type === state.menu.contract_type) {
          return (
            <option value={index} key={nextMenu.id}>
              {nextMenu.name}
            </option>
          );
        }
        return null;
      })
      .filter(Boolean);
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
};

export default MainBottomMenu;
