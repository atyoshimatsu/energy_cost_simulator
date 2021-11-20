import React, { useState } from 'react';
import propTypes from 'prop-types';
import Nav from './Nav/Nav';
import MainInfo from './Main/MainInfo';
import MainTop from './Main/MainTop';
import MainBottom from './Main/MainBottom';
import Sidebar from './Sidebar';
import { StateContext, initState } from './context/context';

const View = ({ user, companies }) => {
  const [state, setState] = useState(initState);
  return (
    <>
      <div className="view">
        <Nav user={user} />
        <div className="wrapper">
          <div className="main">
            <StateContext.Provider value={[state, setState]}>
              <MainInfo />
              <MainTop companies={companies} />
              <MainBottom />
            </StateContext.Provider>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );
};

View.propTypes = {
  user: propTypes.shape({
    id: propTypes.number,
    administrator: propTypes.bool,
    email: propTypes.string,
    nickname: propTypes.string,
    created_at: propTypes.string,
    updated_at: propTypes.string,
  }).isRequired,
  companies: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
      image: propTypes.string,
      text: propTypes.string,
      title: propTypes.string,
      url: propTypes.string,
      created_at: propTypes.string,
      updated_at: propTypes.string,
    })
  ).isRequired,
};

export default View;
