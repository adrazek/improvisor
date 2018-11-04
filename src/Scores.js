import React from "react"

import Team from "./Team"

export default ({logos, scores, animate, theme}) => (
	<div className={"Scores" + (animate ? " Animated" : "")}>
		<Team
			id="Team1"
			logo={logos[0]}
			score={scores[0]}
			hasTheme={theme}
		/>
		<Team
			id="Team2"
			logo={logos[1]}
			score={scores[1]}
			hasTheme={theme}
		/>
		{ theme
			? <div className="Theme">{theme}</div>
			: null
		}
	</div>
)
