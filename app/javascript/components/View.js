import React, { useState } from "react"
import Nav from "./Nav/Nav"
import MainInfo from "./Main/MainInfo"
import MainTop from "./Main/MainTop"
import MainBottom from "./Main/MainBottom"
import Sidebar from "./Sidebar"
import { StateContext, initState } from "./context/context"

const View = props => {
	const [state, setState] = useState(initState);

	return (
			<div className="view">
				<Nav user={props.user} />
				<div className="wrapper">
				<div className="main">
					<StateContext.Provider value={[state, setState]}>
					<MainInfo />
					<MainTop companies={props.companies} />
					<MainBottom />
					</StateContext.Provider>
				</div>
				<Sidebar />
				</div>
			</div>
  );
}

export default View
