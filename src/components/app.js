import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Hearthstone from './hearthstone';

import * as actions from '../actions';
import expansions from '../metadata/expansions';

class App extends Component {
	mobileAndTabletcheck() {
		let check;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			return true;
		} else {
			return false;
		}
		return check;
	}

	componentDidMount() {
		if (!this.mobileAndTabletcheck()) {
			expansions.map((expansion) => {
				this.props.fetchCardInformation(expansion.value);
			});
		}
	}

	render() {
		if ((_.isEmpty(this.props.cards) && _.size(this.props.cards) != expansions.length) || this.props.cards === undefined) {
			return (
				<div className="loading">
					<div className="loading-div">
						Loading Data...
					</div>
				</div>
			);
		}
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
				<div className="frame" />
				<Hearthstone cards={this.props.cards} />
			</div>
		);
	}
}

App.propTypes = {
	cards: PropTypes.object
}

function mapStateToProps(state) {
    return { cards: state.cards };
}

export default connect(mapStateToProps, actions)(App);