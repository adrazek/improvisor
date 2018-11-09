import React from "react"

import "./Waiting.css"

import eclair from "./assets/eclair.png"

import Background from "./Background"

export default class Waiting extends React.Component {

	componentWillMount = () => {
		this._manageUpdate()
	}

	render() {
		const team1 = this.props.team1
		const team2 = this.props.team2

		return (
			<div className="Waiting">
				<div className="BackgroundContainer">
					<Background />
				</div>
				<div className="Content Title">
					Bienvenue à notre soirée improvisation
				</div>
				<div className="Content Seet">
					Installez-vous confortablement et profitez de la douce mélodie
				</div>
				<div className="Tonight">
					Ce soir
				</div>
				<div className="Team Team1">
					<img src={team1} />
				</div>
				<div className="Content IntroVersus">
					<img src={eclair} />
				</div>
				<div className="Team Team2">
					<img src={team2} />
				</div>
				<div className="Content Blabla1">
					{ this.state.sentences[0] }
				</div>
				<div className="Content Blabla2">
					{ this.state.sentences[1] }
				</div>
				<div className="Content Blabla3">
					{ this.state.sentences[2] }
				</div>
				<div className="Content Blabla4">
					{ this.state.sentences[3] }
				</div>
			</div>
		)
	}

	_manageUpdate = () => {
		var indices = []
		indices.push(this._getValue(indices))
		indices.push(this._getValue(indices))
		indices.push(this._getValue(indices))
		indices.push(this._getValue(indices))

		const sentences = indices.map(i => this.props.sentences[i])
		this.setState({sentences}, () => {
			setTimeout(this._manageUpdate, 60000)
		})
	}

	_getValue(indices) {
		var value = Math.floor(Math.random() * this.props.sentences.length)
		if (indices.indexOf(value) !== -1) value = this._getValue(indices)
		return value
	}
}
