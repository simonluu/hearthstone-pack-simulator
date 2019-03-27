import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { FormControl, FormGroup, Image } from 'react-bootstrap';

import CardContainer from '../containers/card_holder';
import { pack_grab, pack_drop } from '../sounds';

import * as actions from '../actions';

import expansions from '../metadata/expansions';

class Hearthstone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x_pos: 0,
            y_pos: 0
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.setVisible = this.setVisible.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.visibility != nextProps.visibility;
    }

    componentDidMount() {
        const pack = ReactDOM.findDOMNode(this.refs.pack);
        const pack_hole = ReactDOM.findDOMNode(this.refs.pack_hole);
        const background = ReactDOM.findDOMNode(this.refs.background);

        pack_hole.style.top = "260px";
        pack_hole.style.left = "707px";

        pack.addEventListener('mouseover', this.onMouseOver);
        pack.addEventListener('mouseout', this.onMouseOut);

        pack.addEventListener('mousedown', this.onMouseDown);

        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', this.movePack);
            background.style.opacity = 1;
            if (parseInt(pack.style.top) > parseInt(pack_hole.style.top) - 10 &&
                parseInt(pack.style.left) > parseInt(pack_hole.style.left) - 10 &&
                parseInt(pack.style.top) < parseInt(pack_hole.style.top) + 10 &&
                parseInt(pack.style.left) < parseInt(pack.style.left) + 10) {
                // set the expansion cards from this.props.cards
                this.props.openPack(!this.props.status.check, this.props.cards[ReactDOM.findDOMNode(this.refs.select).value.replace(/[^A-Z0-9]/ig, "").toLowerCase()]);
                pack.style.pointerEvents = "none";
                // play the pack opening video
                ReactDOM.findDOMNode(this.refs.pack_open).style.display = 'block';
                this.refs.pack_open.play();
                window.setTimeout(this.setVisible, 5000);
            } else {
                // play unselecting pack video
                pack.style.transition = "all 1s ease 0s";
            }
            pack.style.top = "247px";
            pack.style.left = "200px";
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
        const background = ReactDOM.findDOMNode(this.refs.background);
        background.style.opacity = 0;
        pack_grab.volume = .3;
        pack_grab.play();
        this.setState({ x_pos: e.clientX - pack.offsetLeft, y_pos: e.clientY - pack.offsetTop });
        pack.style.transform = "none";
        window.addEventListener('mousemove', this.movePack);
    }

    movePack = (e) => {
        const pack = ReactDOM.findDOMNode(this.refs.pack);
        pack.style.transition = "none";
        pack.style.top = (e.clientY - this.state.y_pos) + 'px';
        pack.style.left = (e.clientX - this.state.x_pos) + 'px';
    }

    renderExpansionList = () => {
        return expansions.map((expansion) => {
            return (
            	<option selected={expansion.selected} value={expansion.value}>
            		{expansion.name}
            	</option>
            );
        })
    }

    render() {
        return (
            <div className="wrapper">
				<div className="pack_hover" />
				<div className="background" ref="background" />
				<video ref="pack_open" className="pack_open">
					<source src="../../sounds/pack_open.mp4" type="video/mp4" />
				</video>
				<Image draggable="false" ref="pack" className="pack" src="../../images/pack.png" width="155px" height="212px" />
				<div className="pack_hole" ref="pack_hole" />
				<CardContainer />
				<FormGroup className="select_expansion">
					<FormControl ref="select" componentClass="select">
						{this.renderExpansionList()}
					</FormControl>
				</FormGroup>
			</div>
        );
    }
}

Hearthstone.propTypes = {
    cards: PropTypes.object,
    visibility: PropTypes.object,
    status: PropTypes.bool
}

function mapStateToProps(state) {
    return { visibility: state.visibility, status: state.status };
}

export default connect(mapStateToProps, actions)(Hearthstone);