import React from 'react';
import propTypes from 'prop-types';
import MainTopTitle from './MainTopTitle';
import MainTopCompany from './MainTopCompany';

const MainTop = ({ companies }) => (
  <>
    <div className="main_top" id="main_top">
      <MainTopTitle />
      <MainTopCompany companies={companies} />
    </div>
  </>
);

MainTop.propTypes = {
  companies: propTypes.arrayOf.isRequired,
};

export default MainTop;
