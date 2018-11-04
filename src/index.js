import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Admin from './Admin';

import Main from './Main'

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route exact path="/admin" component={Admin} />
			<Route path="*" component={Main} />
		</Switch>
	</BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
