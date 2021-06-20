import React, { useState } from 'react'

export const StateContext = React.createContext();
export const initState = {
    company: {},
    menu: {},
    kW: '',
    usages: [null, null, null, null, null, null, null, null, null, null, null, null],
    menues: [],
    areaCode: '',
    nextCompany: { name: '' },
    nextMenues: {},
    nextMenu: {},
};

