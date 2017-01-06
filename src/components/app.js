import React, { Component } from 'react';

import Hearthstone from './hearthstone';

export default class App extends Component {
	mobileAndTabletcheck() {
		let check;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			return true;
		} else {
			return false;
		}
		return check;
	}

	render() {
		if (this.mobileAndTabletcheck()) {
			return (
				<div className="loading">
					<div className="loading-div">
						Please use a Desktop
					</div>
				</div>
			);
		}

		return (
			<div className="main_application">
				<Hearthstone />
			</div>
		);
	}
}