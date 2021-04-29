import React, {useState, useContext} from "react"
// import { Provider } from './context/context'
import Nav from "./Nav/Nav"
import MainInfo from "./Main/MainInfo"
import MainTop from "./Main/MainTop"
import MainBottom from "./Main/MainBottom"
import Sidebar from "./Sidebar"

export const CompanyContext = React.createContext()
export const MenuContext = React.createContext()
export const KWContext = React.createContext()
export const UsagesContext = React.createContext()

const View = props => {
	const [company, setCompany] = useState({});
	const [menu, setMenu] = useState({});
	const [kW, setKW] = useState('');
	const [usages, setUsages] = useState([null, null, null, null, null, null, null, null, null, null, null, null]);

  return (
			<div className="view">
				<Nav user={props.user} />
				<div className="wrapper">
				<div className="main">
					<CompanyContext.Provider value={[company, setCompany]}>
					<MenuContext.Provider value={[menu, setMenu]}>
					<KWContext.Provider value={[kW, setKW]}>
					<UsagesContext.Provider value={[usages, setUsages]}>
					<MainInfo />
					{/* <MainTop companies={props.companies} />
					<MainBottom /> */}
					</UsagesContext.Provider>
					</KWContext.Provider>
					</MenuContext.Provider>
					</CompanyContext.Provider>
				</div>
				<Sidebar />
				</div>
			</div>
  );
}

export default View
