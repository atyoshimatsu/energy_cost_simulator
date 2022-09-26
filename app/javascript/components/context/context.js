import React from 'react';

export const stateContext = React.createContext();
export const initState = {
  company: {},
  menu: {},
  kW: '',
  usages: [null, null, null, null, null, null, null, null, null, null, null, null],
  menues: [],
  areaCode: '',
  nextCompany: { name: '' },
  nextMenues: [],
  nextMenu: {},
};
