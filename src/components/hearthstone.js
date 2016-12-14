import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

import CardContainer from '../containers/card_holder';
import { pack_grab, pack_drop } from '../sounds';

import * as actions from '../actions';

class Hearthstone extends Component {
	constructor(props) {
		super(props);

		this.state = { x_pos: 0, y_pos: 0, background: 'url(/images/base.png)' };

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.setVisible = this.setVisible.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		return this.props.visibility != nextProps.visibility;
	}

	componentDidMount() {
		const pack = ReactDOM.findDOMNode(this.refs.pack);

		pack.addEventListener('mouseover', this.onMouseOver);
		pack.addEventListener('mouseout', this.onMouseOut);

		pack.addEventListener('mousedown', this.onMouseDown);

		window.addEventListener('mouseup', () => {
			window.removeEventListener('mousemove', this.movePack);
			if (parseInt(pack.style.top) > 267 && parseInt(pack.style.left) > 813 && parseInt(pack.style.top) < 298 && parseInt(pack.style.left) < 832) {
				pack.style.pointerEvents = "none";
				// play the pack opening video
				ReactDOM.findDOMNode(this.refs.pack_open).style.display = 'block';
				this.refs.pack_open.play();
				window.setTimeout(this.setVisible, 5000);
			} else {
				// play unselecting pack video
				pack.style.transition = "all 1s ease 0s";
			}
			this.setState({ background: 'url(/images/base.png)' });
			pack.style.top = "310px";
			pack.style.left = "260px";
		});
	}

	componentDidUpdate() {
		const pack = ReactDOM.findDOMNode(this.refs.pack);
		var pointer_event = "";
		if (this.props.visibility.opacity == "0") {
			pointer_event = "auto";
		} else {
			pointer_event = "none";
		}
		pack.style.pointerEvents = pointer_event;
	}

	componentWillUnmount() {
		const pack = ReactDOM.findDOMNode(this.refs.pack);
		pack.removeEventListener('mousedown', this.onMouseDown);
		pack.removeEventListener('mouseover', this.onMouseOver);
		pack.removeEventListener('mouseout', this.onMouseOut);
	}

	onMouseOver() {
		const pack = ReactDOM.findDOMNode(this.refs.pack);
		pack.style.transform = "scale(1.1)";
		pack.style.transition = "none";
	}

	setVisible() {
		const pack_open = ReactDOM.findDOMNode(this.refs.pack_open);
		pack_open.currentTime = 0;
		pack_open.style.display = 'none';
		this.props.setVisibility({ "opacity": "1", "visible": "visible" });
	}

	onMouseOut() {
		const pack = ReactDOM.findDOMNode(this.refs.pack);
		pack.style.transform = "none";
	}

	onMouseDown(e) {
		const pack = ReactDOM.findDOMNode(this.refs.pack);
		pack_grab.volume = .3;
		pack_grab.play();
		this.setState({ x_pos: e.clientX - pack.offsetLeft, y_pos: e.clientY - pack.offsetTop, background: 'url(/images/base-pack_hold.png)' });
		pack.style.transform = "none";
		window.addEventListener('mousemove', this.movePack);
	}

	movePack = (e) => {
		const pack = ReactDOM.findDOMNode(this.refs.pack);
		pack.style.transition = "none";
		pack.style.top = (e.clientY - this.state.y_pos) + 'px';
		pack.style.left = (e.clientX - this.state.x_pos) + 'px';
	}

	render() {
		return (
			<div className="hearthstone-background" style={{ backgroundImage: this.state.background }}>
				<video ref="pack_open" className="pack_open">
					<source src="../../sounds/open_pack.mp4" type="video/mp4" />
				</video>
				<Image draggable="false" ref="pack" className="pack" src="../../images/msog_pack.png" width="186px" height="243px" />
				<CardContainer />
			</div>
		);
	}
}

// width 1542px
// height 812px

function mapStateToProps(state) {
	return { visibility: state.visibility };
}

export default connect(mapStateToProps, actions)(Hearthstone);

// <Image draggable="false" className="position-pack" src="../../images/msog_pack.png" />

					// <video className="pack_open" preload="auto">
					// 	<source src="../../sounds/pack_burst.webm" type="video/webm" />
					// 	<source src="../../sounds/pack_burst.mp4" type="video/mp4" />
					// </video>