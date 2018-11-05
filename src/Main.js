import React from "react"

import { Route, Switch } from 'react-router'

import Waiting from "./Waiting";
import Intro from "./Intro"
import PrezTeam from "./PrezTeam"
import Prez from "./Prez"
import App from './App';
import Pause from './Pause';
import End from './End'

import team1 from './assets/clit.png'
import team2 from './assets/imposteurs.png'

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class Main extends React.Component {

	state = {
		scores: [0, 0],
		doing: false
	}

	componentDidMount = () => {
		socket.emit("currentState", this.props.location.pathname.replace("/", ""))
		socket.on("next", (route, scores) => { 
			this.setState({scores, doing: true}, () => {
				setTimeout(() => {
					this.setState({doing: false}, () => {
						this.props.history.push(route) 
					})
				}, 500)
			})
		})
			
	}

	render() {
		return (
			<div className="Main">
				<div className={"MainContainer" + (this.state.doing ? " Out" : "")}>
					<Switch>
						<Route exact path="/" component={() => <Waiting socket={socket} team1={team1} team2={team2} /> } />
						<Route exact path="/waiting" component={() => <Waiting socket={socket} team1={team1} team2={team2} /> } />
						<Route exact path="/intro" component={() => <Intro socket={socket} /> } />
						<Route exact path="/team1" component={() => <PrezTeam socket={socket} index={0} team={team2} /> } />
						<Route exact path="/team2" component={() => <PrezTeam socket={socket} index={1} team={team1} /> } />
						<Route exact path="/prez" component={() => <Prez socket={socket} team1={team1} team2={team2} /> } />
						<Route exact path="/game*" component={() => <App socket={socket} team1={team1} team2={team2} scores={this.state.scores} /> } />
						<Route exact path="/pause" component={() => <Pause socket={socket} team1={team1} team2={team2} /> } />
						<Route exact path="/end" component={() => <End socket={socket} team1={team1} team2={team2} /> } />
					</Switch>
				</div>
			</div>
		)
	}

}

export default Main
