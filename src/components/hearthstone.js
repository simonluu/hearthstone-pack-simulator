import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Image } from 'react-bootstrap';

import CardContainer from '../containers/card_holder';
import { pack_open, pack_grab, pack_drop } from '../sounds';
import packImage from '../images/pack.png';

import * as actions from '../actions';

import expansions from '../metadata/expansions';

class Hearthstone extends Component {
    constructor(props) {
        super(props);

        this.background = React.createRef();
        this.packOpen = React.createRef();
        this.pack = React.createRef();
        this.packHole = React.createRef();
        this.select = React.createRef();

        this.state = {
            x_pos: 0,
            y_pos: 0
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.movePack = this.movePack.bind(this);
        this.setVisible = this.setVisible.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.visibility != nextProps.visibility;
    }

    componentDidMount() {
        const pack = ReactDOM.findDOMNode(this.pack.current);
        const pack_hole = ReactDOM.findDOMNode(this.packHole.current);
        const background = ReactDOM.findDOMNode(this.background.current);

        pack_hole.style.top = "260px";
        pack_hole.style.left = "707px";

        pack.addEventListener('mouseover', this.onMouseOver);
        pack.addEventListener('mouseout', this.onMouseUp);

        pack.addEventListener('mousedown', this.onMouseDown);

        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', this.movePack);
            background.style.opacity = 1;
            if (parseInt(pack.style.top) > parseInt(pack_hole.style.top) - 10 &&
                parseInt(pack.style.left) > parseInt(pack_hole.style.left) - 10 &&
                parseInt(pack.style.top) < parseInt(pack_hole.style.top) + 10 &&
                parseInt(pack.style.left) < parseInt(pack.style.left) + 10) {
                // set the expansion cards from this.props.cards
                this.props.openPack(!this.props.status.check, this.props.cards[ReactDOM.findDOMNode(this.select.current).value.replace(/[^A-Z0-9]/ig, "").toLowerCase()]);
                pack.style.pointerEvents = "none";
                // play the pack opening video
                ReactDOM.findDOMNode(this.packOpen.current).style.display = 'block';
                this.packOpen.current.play();
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
        const pack = ReactDOM.findDOMNode(this.pack.current);
        var pointer_event = "";
        if (this.props.visibility.opacity == "0") {
            pointer_event = "auto";
        } else {
            pointer_event = "none";
        }
        pack.style.pointerEvents = pointer_event;
    }

    componentWillUnmount() {
        const pack = ReactDOM.findDOMNode(this.pack.current);
        pack.removeEventListener('mousedown', this.onMouseDown);
        pack.removeEventListener('mouseover', this.onMouseOver);
        pack.removeEventListener('mouseout', this.onMouseUp);
    }

    onMouseOver() {
        const pack = ReactDOM.findDOMNode(this.pack.current);
        pack.style.transform = "scale(1.1)";
        pack.style.transition = "none";
    }

    setVisible() {
        const pack_open = ReactDOM.findDOMNode(this.packOpen.current);
        pack_open.currentTime = 0;
        pack_open.style.display = 'none';
        this.props.setVisibility({ "opacity": "1", "visible": "visible" });
    }

    onMouseUp() {
        const pack = ReactDOM.findDOMNode(this.pack.current);
        pack.style.transform = "none";
    }

    onMouseDown(e) {
        const pack = ReactDOM.findDOMNode(this.pack.current);
        const background = ReactDOM.findDOMNode(this.background.current);
        background.style.opacity = 0;
        pack_grab.volume = .3;
        pack_grab.play();
        this.setState({ x_pos: e.clientX - pack.offsetLeft, y_pos: e.clientY - pack.offsetTop });
        pack.style.transform = "none";
        window.addEventListener('mousemove', this.movePack);
    }

    movePack(e) {
        const packNode = this.pack.current;
        const pack = ReactDOM.findDOMNode(this.pack.current);
        pack.style.transition = "none";
        pack.style.top = (e.clientY - this.state.y_pos) + 'px';
        pack.style.left = (e.clientX - this.state.x_pos) + 'px';
    }

    renderExpansionList() {
        return expansions.map((expansion, index) => {
            return (
            	<option key={index} defaultValue={expansion.defaultValue} value={expansion.value}>
            		{expansion.name}
            	</option>
            );
        })
    }

    render() {
        return (
            <div className="wrapper">
				<div className="pack_hover" />
				<div className="background" ref={this.background} />
				<video ref={this.packOpen} className="pack_open">
					<source src={pack_open} type="video/mp4" />
				</video>
				<img draggable="false" ref={this.pack} className="pack" src={packImage} width="155px" height="212px" />
				<div className="pack_hole" ref={this.packHole} />
				<CardContainer />
                <Form>
                    <Form.Group className="select_expansion">
                        <Form.Control as="select" ref={this.select} componentclass="select" defaultValue="Knights of the Frozen Throne">
                            {this.renderExpansionList()}
                        </Form.Control>
                    </Form.Group>
                </Form>
			</div>
        );
    }
}

Hearthstone.propTypes = {
    cards: PropTypes.object,
    visibility: PropTypes.object,
    status: PropTypes.object
}

function mapStateToProps(state) {
    return { visibility: state.visibility, status: state.status };
}

export default connect(mapStateToProps, actions)(Hearthstone);