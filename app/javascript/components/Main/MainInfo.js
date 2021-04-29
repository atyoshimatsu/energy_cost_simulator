import React, { useState } from "react"
import MainInfoTitle from "./MainInfoTitle"
import MainInfoCompany from "./MainInfoCompany"
import MainInfoArea from "./MainInfoArea"
import MainInfoMenu from "./MainInfoMenu"
import MainInfoContract from "./MainInfoContract"
import MainInfoUsage from "./MainInfoUsage"

export const MenuesContext = React.createContext()
export const AreaCodeContext = React.createContext()

const MainInfo = () => {
	const [menues, setMenues] = useState([]);
	const [areaCode, setAreaCode] = useState('');
	return (
		<div className="main_info" id="main_info">
		  <MainInfoTitle />
		  <form>
			<MenuesContext.Provider value={[menues, setMenues]}>
			<AreaCodeContext.Provider value={[areaCode, setAreaCode]}>
				<MainInfoCompany  />
				<MainInfoArea />
				<MainInfoMenu />
				<MainInfoContract  />
				<MainInfoUsage />
			</AreaCodeContext.Provider>
			</MenuesContext.Provider>
		  </form>
		</div>
	);

}

export default MainInfo
