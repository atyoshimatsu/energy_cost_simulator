import React, { useState } from 'react'

export const StateContext = React.createContext();
export const initState = {
    company: {},
    menu: {},
    kW: '',
    usages: [null, null, null, null, null, null, null, null, null, null, null, null],
    menues: [],
    areaCode: '',
    nextCompany: {},
    nextMenues: {},
    nextMenue: {},
};

// export const CompanyContext = React.createContext();
// export const AreaCodeContext = React.createContext();
// export const MenuContext = React.createContext();
// export const KWContext = React.createContext();
// export const UsagesContext = React.createContext();
// export const NextCompanyContext = React.createContext();
// export const NextMenuesContext = React.createContext();
// export const Contexts = {
//     Company: CompanyContext,
//     AreaCode: AreaCodeContext,
//     Menu: MenuContext,
//     KW: KWContext,
//     Usages: UsagesContext,
//     NextCompany: NextCompanyContext,
//     NextMenues: NextMenuesContext,
// }

// export const CompanyProvider = CompanyContext.Provider;
// export const AreaCodeProvider = AreaCodeContext.Provider;
// export const MenuProvider = MenuContext.Provider;
// export const KWProvider = KWContext.Provider;
// export const UsagesProvider = UsagesContext.Provider;
// export const NexCompanyProvider = NextCompanyContext.Provider;
// export const NextMenuesProvider = NextMenuesContext.Provider;

// export const Provider = ({ children }) => {
//     const [company, setCompany] = useState({});
//     const [areaCode, setAreaCode] = useState('');
//     const [menu, setMenu] = useState('');
//     const [kW, setKW] = useState('');
//     const [usages, setUsages] = useState([]);
//     const [nextCompany, setNextCompany] = useState('');
//     const [nextMenues, setNextMenues] = useState([]);

//     return (
//         <CompanyProvider value={[company, setCompany]}>
//             <AreaCodeProvider value={[areaCode, setAreaCode]}>
//                 <MenuProvider value={[menu, setMenu]}>
//                     <KWProvider value={[kW, setKW]}>
//                         <UsagesProvider value={[usages, setUsages]}>
//                             <NexCompanyProvider value={[nextCompany, setNextCompany]}>
//                                 <NextMenuesProvider value={[nextMenues, setNextMenues]}>
//                                     {children}
//                                 </NextMenuesProvider>
//                             </NexCompanyProvider>
//                         </UsagesProvider>
//                     </KWProvider>
//                 </MenuProvider>
//             </AreaCodeProvider>
//         </CompanyProvider>
//     )
// }
