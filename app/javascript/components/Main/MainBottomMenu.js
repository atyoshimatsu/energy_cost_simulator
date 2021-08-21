import React, { useContext } from 'react';
import { StateContext } from '../context/context';

const MainBottomMenu = () => {
  const [state, setState] = useContext(StateContext);

  const handleChange = (e) => {
    setState({ ...state, nextMenu: state.nextMenues[e.target.value] });
  };

  const searchResult = [];
  if (state.nextMenues.length != 0) {
    for (const num in state.nextMenues) {
      if (state.nextMenues[num].contract_type === state.menu.contract_type) {
        searchResult.push(
          <option value={num} key={state.nextMenues[num].id}>{state.nextMenues[num].name}</option>,
        );
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
};

export default MainBottomMenu;
