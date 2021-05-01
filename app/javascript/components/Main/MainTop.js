import React from "react"
import MainTopTitle from "./MainTopTitle"
import MainTopCompany from "./MainTopCompany";

const MainTop = (props) => {
	return (
		<div className="main_top" id="main_top">
			<MainTopTitle />
			<MainTopCompany  companies={props.companies} />
	</div>
	);

}

export default MainTop
