import React from "react"

export default ({animate, logo}) => (
	<div className={"Scoring" + (animate ? " Animated" : "")}>
		<div className="Background">
			<div id="back1" className="Back" />
			<div id="back2" className="Back" />
			<div id="back3" className="Back" />
			<div id="back4" className="Back" />
			<div id="back5" className="Back" />
		</div>
		{ animate
			? [
					<img src={logo} className="Logo" alt="logo" />,
					<div className="PlusOne">+1</div>
				]
			: null
		}
	</div>
)
