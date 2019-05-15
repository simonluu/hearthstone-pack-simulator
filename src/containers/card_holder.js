import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

import { common_turn_over, rare_turn_over, epic_turn_over, legendary_turn_over,
	rare, epic, legendary, golden_common, golden_rare, golden_epic, golden_legendary,
	done_appear, done_press, mouse_over, mouse_away } from '../sounds';
import * as actions from '../actions';

// 69.29% Common, 21.78% Rare, 4.49% Epic, 1.02% Legendary
// 1.64% Golden Comon , 1.47% Golden Rare, 0.22% Golden Epic, 0.09% Golden Legendary

// Rare Glow #0066FF
// Legendary Glow #FF8000
// Epic glow #CC33FF

class CardContainer extends Component {
	constructor(props) {
		super(props);

		this.done = React.createRef();

		this.state = { revealed: 0, boxShadow: "none" };
	}

	componentDidUpdate(prevProps) {
		if (this.props.status.check != prevProps.status.check) {
			//select 5 random cards from the set
			const sortedCards = this.sortCards();
			var commonCount = 0;
			let card = {};

			for (var i = 0; i < 5; i++){
				var determineRarity = 0;
				if (commonCount != 4) {
					determineRarity = Math.random();
				} else {
					while (determineRarity <= .6929 || determineRarity <= .9822 && determineRarity > .9658) {
						determineRarity = Math.random();
					}
				}

				if (determineRarity <= .6929) {
					// Adds Common Card
					card.golden = false;
					card.data = sortedCards[0][Math.floor(Math.random() * (sortedCards[0].length - 1))];
					commonCount++;
				} else if (determineRarity <= .9107 && determineRarity > .6929) {
					// Adds Rare Card
					card.golden = false;
					card.data = sortedCards[1][Math.floor(Math.random() * (sortedCards[1].length - 1))];
				} else if (determineRarity <= .9556 && determineRarity > .9107) {
					// Adds Epic Card
					card.golden = false;
					card.data = sortedCards[2][Math.floor(Math.random() * (sortedCards[2].length - 1))];
				} else if (determineRarity <= .9658 && determineRarity > .9556) {
					// Adds Legendary Card
					card.golden = false;
					card.data = sortedCards[3][Math.floor(Math.random() * (sortedCards[3].length - 1))];
				} else if (determineRarity <= .9822 && determineRarity > .9658) {
					// Adds Golden Common Card
					card.golden = true;
					card.data = sortedCards[0][Math.floor(Math.random() * (sortedCards[0].length - 1))];
					commonCount++;
				} else if (determineRarity <= .9969 && determineRarity > .9822) {
					// Adds Golden Rare Card
					card.golden = true;
					card.data = sortedCards[1][Math.floor(Math.random() * (sortedCards[1].length - 1))];
				} else if (determineRarity <= .9991 && determineRarity > .9969) {
					// Adds Golden Epic Card
					card.golden = true;
					card.data = sortedCards[2][Math.floor(Math.random() * (sortedCards[2].length - 1))];
				} else if (determineRarity <= 1 && determineRarity > .9991) {
					// Adds Golden Legendary Card
					card.golden = true;
					card.data = sortedCards[3][Math.floor(Math.random() * (sortedCards[3].length - 1))];
				}
				this.props.updatePack(card);
				card = {};
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.revealed == nextState.revealed || this.props.status.set != nextProps.status.set || this.props.visibility != nextProps.visibility || this.props.check != nextProps.check;
	}

	sortCards() {
		const commonArray = [];
		const rareArray = [];
		const epicArray = [];
		const legendaryArray = [];
		this.props.status.set.map((card) => {
			if (card.rarity == "Common") {
				commonArray.push(card);
			} else if (card.rarity == "Rare") {
				rareArray.push(card);
			} else if (card.rarity == "Epic") {
				epicArray.push(card);
			} else if (card.rarity == "Legendary") {
				legendaryArray.push(card);
			}
		});
		return [commonArray, rareArray, epicArray, legendaryArray];
	}

	handleClick(e, card, cardId, glowId, foil, common, rare, epic, legendary) {
		let sound;
		const done_button = ReactDOM.findDOMNode(this.done.current);
		document.getElementById(glowId).style.boxShadow = 'none';
		// need to find react way to implement this
		document.getElementById(`${e.target.id}`).className += " flipped";

		if (card.rarity == "Common") {
			sound = common_turn_over.cloneNode(true);
			if (foil) {
				golden_common.cloneNode(true).play();
			}
		} else if (card.rarity == "Rare") {
			sound = rare_turn_over.cloneNode(true);
			rare.cloneNode(true).play();
		} else if (card.rarity == "Epic") {
			sound = epic_turn_over.cloneNode(true);
			epic.cloneNode(true).play();
		} else if (card.rarity == "Legendary") {
			sound = legendary_turn_over.cloneNode(true);
			legendary.cloneNode(true).play();
		}
		sound.volume = .2;
		sound.play();

		document.getElementById(cardId).style.boxShadow = 'none';

		this.setState({ revealed: this.state.revealed + 1 });
		if (this.state.revealed == 4) {
			done_button.style.display = 'block';
			done_button.className += ' visible';
			done_appear.volume = .2;
			done_appear.play();
		}	
	}

	handleRegularClick(e, card, cardId, glowId) {
		this.handleClick(e, card, cardId, glowId, false, null, rare, epic, legendary);
	}

	handleGoldenClick(e, card, cardId, glowId) {
		this.handleClick(e, card, cardId, glowId, true, golden_common, golden_rare, golden_epic, golden_legendary);
	}

	handleDoneClick() {
		const done_button = ReactDOM.findDOMNode(this.done.current);
		done_button.style.display = 'none';
		done_button.className = done_button.className.replace( /(?:^|\s)visible(?!\S)/g , '' );
		done_press.volume = .2;
		done_press.play();
		this.props.setVisibility({ "opacity": "0", "visible": "hidden" });
		this.props.updatePack(null);

		const cardList = document.getElementsByClassName('card');
		for (var i = 0; i < 5; i++) {
			cardList[i].className = 'card';
		}
		this.setState({ revealed: 0 });
	}

	cardHover(card, cardId, glowId) {
		const glow = document.getElementById(glowId);
		const sound = mouse_over.cloneNode(true);

		if (!document.getElementById(cardId.split('card')[1]).classList.contains('flipped')) {
			sound.volume = .2;
			sound.play();
			if (card.rarity == "Rare") {
				glow.style.boxShadow = '0px 0px 100px #0066FF';
			} else if (card.rarity == "Epic") {
				glow.style.boxShadow = '0px 0px 100px #CC33FF';
			} else if (card.rarity == "Legendary") {
				glow.style.boxShadow = '0px 0px 100px #FF8000';
			}
		}
	}

	cardHoverOut(card, cardId, glowId) {
		const sound = mouse_away.cloneNode(true);
		if (!document.getElementById(cardId.split('card')[1]).classList.contains('flipped')) {
			sound.volume = .2;
			sound.play();
		}
		document.getElementById(glowId).style.boxShadow = 'none';
	}

	renderRegularImage(pack, card) {
		const cards_length = pack.length;
		pack.push(
			<div key={`card${cards_length}`} className="card_container" id={`card${cards_length}`}
				 onMouseOver={() => {this.cardHover(card, `card${cards_length}` , `glow${cards_length}`)}}
				 onMouseOut={() => {this.cardHoverOut(card, `card${cards_length}` , `glow${cards_length}`)}}>
				<div className="card_glow" id={`glow${cards_length}`} />
				<div className="card" id={`${cards_length}`}>
					<Image draggable="false" className="front" id={`${cards_length}`} onClick={(e) => {this.handleRegularClick(e, card, `card${cards_length}`, `glow${cards_length}`)}} src="../images/classic.png" width="200px" height="307px" />
					<Image draggable="false" className="back" src={card.img} width="200px" height="307px" />
				</div>
			</div>
		);		
	}

	renderGoldenImage(pack, card) {
		const cards_length = pack.length;
		pack.push(
			<div key={`card${cards_length}`} className="card_container" id={`card${cards_length}`}
				 onMouseOver={() => {this.cardHover(card, `card${cards_length}` , `glow${cards_length}`)}}
				 onMouseOut={() => {this.cardHoverOut(card, `card${cards_length}` , `glow${cards_length}`)}}>
				<div className="card_glow" id={`glow${cards_length}`} />
				<div className="card" id={`${cards_length}`}>
					<Image draggable="false" className="front" id={`${cards_length}`} onClick={(e) => {this.handleGoldenClick(e, card, `card${cards_length}`, `glow${cards_length}`)}} src="../images/classic.png" width="200px" height="307px" />
					<Image draggable="false" className="back" src={card.imgGold} width="200px" height="307px" />
				</div>
			</div>
		);		
	}

	renderFiveCards() {
		const statePack = this.props.pack;
		var pack = []
		for (var index in statePack) {
			if (statePack[index].golden) {
				this.renderGoldenImage(pack, statePack[index].data);
			} else {
				this.renderRegularImage(pack, statePack[index].data);
			}
		}
		return pack;
	}

	render() {
		return (
			<div className="card_holder" style={{ opacity: this.props.visibility.opacity, visibility: this.props.visibility.visible }}>
				{this.props.status.set  && this.props.pack.length > 0 ? this.renderFiveCards() : <div className="noCards" />}
				<div ref={this.done} className="done" onClick={() => {this.handleDoneClick()}} />
			</div>
		);
	}
}

CardContainer.propTypes = {
	visibility: PropTypes.object,
	pack: PropTypes.array,
	status: PropTypes.object
}

function mapStateToProps(state) {
	return { visibility: state.visibility, pack: state.pack, status: state.status };
}

export default connect(mapStateToProps, actions)(CardContainer);