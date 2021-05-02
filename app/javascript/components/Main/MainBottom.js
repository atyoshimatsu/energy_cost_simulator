import React from "react"
import MainBottomTitle from "./MainBottomTitle"
import MainBottomCompany from "./MainBottomCompany"
import MainBottomMenu from "./MainBottomMenu"
import MainBottomChart from "./MainBottomChart"

const MainBottom = () => {
  return (
    <div className="main_bottom" id="main_bottom">
      <MainBottomTitle />
      <MainBottomCompany />
      <MainBottomMenu />
      <MainBottomChart />
    </div>
  );

}

export default MainBottom
