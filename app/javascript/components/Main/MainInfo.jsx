import React from 'react';
import MainInfoTitle from './MainInfoTitle';
import MainInfoCompany from './MainInfoCompany';
import MainInfoArea from './MainInfoArea';
import MainInfoMenu from './MainInfoMenu';
import MainInfoContract from './MainInfoContract';
import MainInfoUsage from './MainInfoUsage';

const MainInfo = () => (
  <div className="main_info" id="main_info">
    <MainInfoTitle />
    <form>
      <MainInfoCompany />
      <MainInfoArea />
      <MainInfoMenu />
      <MainInfoContract />
      <MainInfoUsage />
    </form>
  </div>
);

export default MainInfo;
