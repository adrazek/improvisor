import React from "react"

import team1 from './assets/clit.png'
import team2 from './assets/imposteurs.png'

import Team from './AdminTeam'

import openSocket from 'socket.io-client';

import './Admin.css'

class Admin extends React.Component {

	statuses = ["waiting", "intro", "team1", "team2", "prez", "game1", "pause", "game2", "end"]
	labels = ["Entrée salle", "Intro MC", "Entrée Equipe 1", "Entrée Equipe 2", "Présentation", "1ere mi-temps", "Entracte", "Seconde mi-temps", "Fin"]

	state = {
		status: "waiting"
	}

	socket = null

	componentDidMount = () => {
		const target = window.location.href.split("/")[2].split(":")[0]
		this.socket = openSocket(`http://${target}:8000`);

		this.socket.on('currentState', (state) => { this.setState({status: state}) })
	}

	render() {
		return (
			<div className="Admin">
				<div className="Navigation">
					{ this.statuses.indexOf(this.state.status) > 0
						? <button onClick={() => { this._setPrevious(() => { this.socket.emit("next", this.state.status) }) } } className="btn-nav btn-previous"> {"<"} </button>
						: <div />
					}
					{ this.statuses.indexOf(this.state.status) < (this.statuses.length - 1)
						? <button onClick={() => { this._setNext(() => { this.socket.emit("next", this.state.status) }) } } className="btn-nav btn-next"> > </button>
						: null
					}
				</div>
				{ this.state.status.indexOf("game") !== -1
					? [
							<Team
								id="Team1"
								logo={team1}
								onMinus={() => { this.socket.emit("minusOne", 0) }}
								onPlusAnim={() => { this.socket.emit("plusOne", 0, true) }}
								onPlus={() => { this.socket.emit("plusOne", 0) }}
							/>,
							<Team
								id="Team2"
								logo={team2}
								onMinus={() => { this.socket.emit("minusOne", 1) }}
								onPlusAnim={() => { this.socket.emit("plusOne", 1, true) }}
								onPlus={() => { this.socket.emit("plusOne", 1) }}
							/>,
							<div className="ThemePicker">
								<input type="text" ref="theme" />
								<button onClick={() => { this.socket.emit("theme", this.refs.theme.value) }}>Envoyer</button>
							</div>
						]
					: <div className="RouteTitle">
							{this._getRouteTitle()}
						</div>
				}
			</div>
		)
	}

	_setNext = (callback) => {
		const index = this.statuses.indexOf(this.state.status) + 1
		if (index < this.statuses.length) {
			this.setState({status: this.statuses[index]}, callback)
		}
	}

	_setPrevious = (callback) => {
		const index = this.statuses.indexOf(this.state.status) - 1
		if (index >= 0) {
			this.setState({status: this.statuses[index]}, callback)
		}
	}

	_getRouteTitle = () => {
		return this.labels[this.statuses.indexOf(this.state.status)]
	}

}

export default Admin
