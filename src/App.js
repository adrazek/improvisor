import React, { Component } from 'react'
import { withRouter } from "react-router";

import {HotKeys} from 'react-hotkeys';

import 'odometer/themes/odometer-theme-default.css';
import './App.css'

import Scores from "./Scores"
import Scoring from "./Scoring"

import openSocket from 'socket.io-client';

class App extends Component {

	state = {
		doing: false,
		scores: [0, 0],
		last: undefined,
		theme: "",
		outTheme: false
	}

	componentDidMount = () => {
		this.setState({scores: this.props.scores}, () => {
			this.props.socket.on("plusOne", this._handleScoreUp)
			this.props.socket.on("minusOne", this._handleScoreDown)
			this.props.socket.on("theme", this._handleTheme)
		})
	}

  render() {
		const keyMap = {
			team1ScoreDown: "a",
			team1ScoreUp: "z",
			team1ScoreForceUp: "e",
			team2ScoreDown: "i",
			team2ScoreUp: "o",
			team2ScoreForceUp: "p"
		}

		const handlers = {
			team1ScoreDown: this._handleScoreDown.bind(this, 0),
			team1ScoreUp: this._handleScoreUp.bind(this, 0),
			team1ScoreForceUp: this._handleScoreForceUp.bind(this, 0),
			team2ScoreDown: this._handleScoreDown.bind(this, 1),
			team2ScoreUp: this._handleScoreUp.bind(this, 1),
			team2ScoreForceUp: this._handleScoreForceUp.bind(this, 1),
		}

		const animate = (this.state.lastUp !== undefined)

    return (
			<HotKeys keyMap={keyMap} handlers={handlers}>
					<Scoring
						animate={animate}
						logo={this.state.lastUp == 0 ? this.props.team1 : this.props.team2}
					/>
					<Scores
						animate={animate}
						logos={[this.props.team1, this.props.team2]}
						scores={this.state.scores}
						theme={this.state.theme}
						outTheme={this.state.outTheme}
					/>
			</HotKeys>
    )
  }

	_handleScoreDown = (index) => {
		if (!this.state.doing && this.state.scores[index] > 0) {
			var scores = this.state.scores
			scores[index]--
			this.setState({lastDown: undefined, doing: false, theme: undefined})
		}
	}

	_handleScoreForceUp = (index) => {
		if (!this.state.doing) {
			var scores = this.state.scores
			scores[index]++
			this.setState({lastDown: undefined, doing: false, theme: undefined})
		}
	}

	_handleScoreUp = (index, animate) => {
		if (!this.state.doing) {
			console.log("THEME")
			console.log(this.state.theme)
			if (this.state.theme) {
				this._handleTheme("", () => { this._handleScoreUp(index, animate) })
			} else {
				var scores = this.state.scores
				if (animate) {
					this.setState({lastUp: index, doing: true, theme: undefined}, () => {
						setTimeout(() => {
							scores[index]++
							this.setState({scores, lastUp: undefined, doing: false, theme: undefined})
						}, 8500)
					})
				} else {
					scores[index]++
					this.setState({lastUp: undefined, doing: false, theme: undefined})
				}
			}
		}
	}

	_handleTheme = (theme, callback=null) => {
		if (theme == "" && !this.state.outTheme) {
			this.setState({outTheme: true}, () => {
				setTimeout(() => {
					this._handleTheme(theme, callback)
				}, 500)
			})
		} else {
			this.setState({theme, outTheme: false}, () => {
				if (callback) callback()
			})
		}
	}
}

export default App
