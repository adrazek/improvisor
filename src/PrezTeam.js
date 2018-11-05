import React from "react"

import Background from "./Background"

import './PrezTeam.css'

export default ({team}) => (
	<div className="PrezTeam">
		<Background />
		<div className="PrezTeamContainer">
			<img src={team} />
		</div>
	</div>
)
