import React from "react"

import "./Waiting.css"

import Background from "./Background"

export default ({team1, team2}) => (
	<div className="Waiting">
		<div className="BackgroundContainer">
			<Background />
		</div>
		<div className="Content Title">
			Bienvenue à notre soirée improvisation
		</div>
		<div className="Content Seet">
			Installez-vous confortablement et profitez du paysage
		</div>
		<div className="Tonight">
			Ce soir
		</div>
		<div className="Team Team1">
			<img src={team1} />
		</div>
		<div className="Content IntroVersus">
			VS
		</div>
		<div className="Team Team2">
			<img src={team2} />
		</div>
	</div>
)
