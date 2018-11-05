import React from "react"

import team1 from './assets/clit.png'
import team2 from './assets/imposteurs.png'

import Team from './AdminTeam'

import openSocket from 'socket.io-client';

class Admin extends React.Component {

	statuses = ["waiting", "intro", "team1", "team2", "prez", "game1", "pause", "game2", "end"]

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
				{ this.statuses.indexOf(this.state.status) > 0
					? <button onClick={() => { this._setPrevious(() => { this.socket.emit("next", this.state.status) }) } }>Précédent</button>
					: null
				}
				{ this.statuses.indexOf(this.state.status) < (this.statuses.length - 1)
					? <button onClick={() => { this._setNext(() => { this.socket.emit("next", this.state.status) }) } }>Suivant</button>
					: null
				}
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
					: null
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

}

export default Admin
