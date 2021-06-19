import React, { useState } from "react"
import Nav from "./Nav/Nav"
import MainInfo from "./Main/MainInfo"
import MainTop from "./Main/MainTop"
import MainBottom from "./Main/MainBottom"
import Sidebar from "./Sidebar"
import { StateContext, initState } from "./context/context"

export const KWContext = React.createContext()
export const UsagesContext = React.createContext()
export const MenuesContext = React.createContext()
export const AreaCodeContext = React.createContext()
export const NextCompanyContext = React.createContext()
export const NextMenuesContext = React.createContext()
export const NextMenuContext = React.createContext()


const View = props => {
	const [state, setState] = useState(initState);
	const [kW, setKW] = useState('');
	const [usages, setUsages] = useState([null, null, null, null, null, null, null, null, null, null, null, null]);
	const [menues, setMenues] = useState([]);
	const [areaCode, setAreaCode] = useState('');
	const [nextCompany, setNextCompany] = useState({});
	const [nextMenues, setNextMenues] = useState({});
	const [nextMenu, setNextMenu] = useState({});

	return (
			<div className="view">
				<Nav user={props.user} />
				<div className="wrapper">
				<div className="main">
					<StateContext.Provider value={[state, setState]}>
					<KWContext.Provider value={[kW, setKW]}>
					<UsagesContext.Provider value={[usages, setUsages]}>
					<MenuesContext.Provider value={[menues, setMenues]}>
					<AreaCodeContext.Provider value={[areaCode, setAreaCode]}>
					<MainInfo />
					<NextCompanyContext.Provider value={[nextCompany, setNextCompany]}>
					<NextMenuesContext.Provider value={[nextMenues, setNextMenues]}>
					<NextMenuContext.Provider value={[nextMenu, setNextMenu]}>
					<MainTop companies={props.companies} />
					<MainBottom />
					</NextMenuContext.Provider>
					</NextMenuesContext.Provider>
					</NextCompanyContext.Provider>
					</AreaCodeContext.Provider>
					</MenuesContext.Provider>
					</UsagesContext.Provider>
					</KWContext.Provider>
					</StateContext.Provider>
				</div>
				<Sidebar />
				</div>
			</div>
  );
}

export default View
