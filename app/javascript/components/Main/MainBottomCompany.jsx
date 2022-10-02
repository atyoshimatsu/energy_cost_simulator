import React, { useContext } from 'react';
import { stateContext } from '../context/context';

const MainBottomCompany = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useContext(stateContext);
  return (
    <>
      <div className="main_bottom_company">比較する電力会社</div>
      <div className="main_bottom_company_name">{state.nextCompany.name}</div>
    </>
  );
};

export default MainBottomCompany;
