import React from "react"

export default ({id, logo, onMinus, onPlus, onPlusAnim}) => (
	<div id={id} className="AdminTeam">
		<div className="LogoContainer">
	  	<img src={logo} className="Logo" alt="Logo" />
		</div>
		<div className="Actions">
			<button className="ActionDefault" onClick={onMinus}>-</button>
			<button className="ActionAnimate" onClick={onPlusAnim}>GO!</button>
			<button className="ActionDefault" onClick={onPlus}>+</button>
		</div>
	</div>
)
