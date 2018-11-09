import React from "react"

import explosion from './assets/Heart_Explosion.png'

import './Intro.css'

export default ({team1, team2}) => (
	<div className="Intro">
		<img className="explosion" src={explosion} />
		<img src={team1} className="IntroTeam1" />
		<img src={team2} className="IntroTeam2" />
	</div>
)
