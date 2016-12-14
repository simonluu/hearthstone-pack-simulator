import React, { Component } from 'react';

import Hearthstone from './hearthstone';

export default class App extends Component {
	render() {
		return (
			<div className="main_application">
				<Hearthstone />
				<a className="github" href="https://github.com/hearthstonepacksimulator/hearthstonepackstimulator.github.io">
					<i className="fa fa-github-square" aria-hidden="true" style={{ marginRight : '5px', color : 'black' }}></i>
				</a>
			</div>
		);
	}
}