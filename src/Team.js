import React from "react"

import Odometer from 'react-odometerjs'

export default ({id, logo, scoring, score, hasTheme}) => (
	<div id={id} className={"Team" + (hasTheme ? " WithTheme" : "")}>
		<div className="LogoContainer">
	  	<img src={logo} className={"Logo" + (scoring ? " animated" : "")} alt="logo" />
		</div>
		{/*<Odometer value={score} />*/}
		<div className="score-value">{score}</div>
	</div>
)
