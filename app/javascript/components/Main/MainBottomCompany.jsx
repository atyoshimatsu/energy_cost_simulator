import React, { useContext } from 'react';
import { StateContext } from '../context/context';

const MainBottomCompany = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useContext(StateContext);
  return (
    <>
      <div className="main_bottom_company">比較する電力会社</div>
      <div className="main_bottom_company_name">{state.nextCompany.name}</div>
    </>
  );
};

export default MainBottomCompany;
