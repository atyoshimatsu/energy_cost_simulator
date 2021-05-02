import React, { useContext } from "react"
import { NextCompanyContext}  from '../View'

const MainBottomCompany = () => {
  const [nextCompany, setNextCompany] = useContext(NextCompanyContext);
  return(
    <>
      <div className="main_bottom_company">比較する電力会社</div>
      <div className="main_bottom_company_name">{nextCompany.name}</div>
    </>
  );
}

export default MainBottomCompany
