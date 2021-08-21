import React, { useContext } from 'react';
import { StateContext } from '../context/context';

const MainInfoMenu = () => {
  const [state, setState] = useContext(StateContext);

  const handleChange = (e) => {
    setState({ ...state, menu: state.menues[e.target.value] });
  };

  const searchResult = [];
  let i = 0;
  if (state.menues.length != 0) {
    state.menues.forEach((menu) => {
      searchResult.push(
        <option value={i} key={menu.id}>{menu.name}</option>,
      );
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
};

export default MainInfoMenu;
