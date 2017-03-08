import React, { Component } from 'react';
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

		this.state = { revealed: 0, boxShadow: "none" };
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.revealed == nextState.revealed || this.props.cards != nextProps.cards || this.props.visibility != nextProps.visibility;
	}

	sortCards() {
		const commonArray = [];
		const rareArray = [];
		const epicArray = [];
		const legendaryArray = [];
		this.props.cards.map((card) => {
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
		const done_button = ReactDOM.findDOMNode(this.refs.done);
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
		const done_button = ReactDOM.findDOMNode(this.refs.done);
		done_button.style.display = 'none';
		done_button.className = done_button.className.replace( /(?:^|\s)visible(?!\S)/g , '' );
		done_press.volume = .2;
		done_press.play();
		this.props.setVisibility({ "opacity": "0", "visible": "hidden" });

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

	renderRegularImage(cards, raritySize, rarity) {
		const card_index = Math.floor(Math.random() * (raritySize));
		const cards_length = cards.length;
		cards.push(
			<div className="card_container" id={`card${cards_length}`}
				 onMouseOver={() => {this.cardHover(rarity[card_index], `card${cards_length}` , `glow${cards_length}`)}}
				 onMouseOut={() => {this.cardHoverOut(rarity[card_index], `card${cards_length}` , `glow${cards_length}`)}}>
				<div className="card_glow" id={`glow${cards_length}`} />
				<div className="card" id={`${cards_length}`}>
					<Image draggable="false" className="front" id={`${cards_length}`} onClick={(e) => {this.handleRegularClick(e, rarity[card_index], `card${cards_length}`, `glow${cards_length}`)}} src="../images/classic.png" width="200px" height="307px" />
					<Image draggable="false" className="back" src={rarity[card_index].img} width="200px" height="307px" />
				</div>
			</div>
		);		
	}

	renderGoldenImage(cards, raritySize, rarity) {
		const card_index = Math.floor(Math.random() * (raritySize));
		const cards_length = cards.length;
		cards.push(
			<div className="card_container" id={`card${cards_length}`}
				 onMouseOver={() => {this.cardHover(rarity[card_index], `card${cards_length}` , `glow${cards_length}`)}}
				 onMouseOut={() => {this.cardHoverOut(rarity[card_index], `card${cards_length}` , `glow${cards_length}`)}}>
				<div className="card_glow" id={`glow${cards_length}`} />
				<div className="card" id={`${cards_length}`}>
					<Image draggable="false" className="front" id={`${cards_length}`} onClick={(e) => {this.handleGoldenClick(e, rarity[card_index], `card${cards_length}`, `glow${cards_length}`)}} src="../images/classic.png" width="200px" height="307px" />
					<Image draggable="false" className="back" src={rarity[card_index].imgGold} width="200px" height="307px" />
				</div>
			</div>
		);		
	}

	renderFiveCards() {
		const sortedCards = this.sortCards();
		const cards = [];
		var commonCount = 0;
		for (var i = 0; i < 5; i++) {
			var determineRarity = 0;

			if (commonCount != 4) {
				determineRarity = Math.random();
			} else {
				while (determineRarity <= .6929 || determineRarity <= .9822 && determineRarity > .9658) {
					determineRarity = Math.random();
				}
			}

			if (determineRarity <= .6929) {
				// Renders Common Card
				this.renderRegularImage(cards, 49, sortedCards[0]);
				commonCount++;
			} else if (determineRarity <= .9107 && determineRarity > .6929) {
				// Renders Rare Card
				this.renderRegularImage(cards, 36, sortedCards[1]);
			} else if (determineRarity <= .9556 && determineRarity > .9107) {
				// Renders Epic Card
				this.renderRegularImage(cards, 27, sortedCards[2]);
			} else if (determineRarity <= .9658 && determineRarity > .9556) {
				// Renders Legendary Card
				this.renderRegularImage(cards, 20, sortedCards[3]);
			} else if (determineRarity <= .9822 && determineRarity > .9658) {
				// Renders Golden Common Card
				this.renderGoldenImage(cards, 49, sortedCards[0]);
				commonCount++;
			} else if (determineRarity <= .9969 && determineRarity > .9822) {
				// Renders Golden Rare Card
				this.renderGoldenImage(cards, 36, sortedCards[1]);
			} else if (determineRarity <= .9991 && determineRarity > .9969) {
				// Renders Golden Epic Card
				this.renderGoldenImage(cards, 27, sortedCards[2]);
			} else if (determineRarity <= 1 && determineRarity > .9991) {
				// Renders Golden Legendary Card
				this.renderGoldenImage(cards, 20, sortedCards[3]);
			}
		}
		return cards;
	}

	render() {
		return (
			<div className="card_holder" style={{ opacity: this.props.visibility.opacity, visibility: this.props.visibility.visible }}>
				{this.props.cards ? this.renderFiveCards() : <div className="noCards" />}
				<div ref="done" className="done" onClick={() => {this.handleDoneClick()}} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { cards: state.cards.data, visibility: state.visibility };
}

export default connect(mapStateToProps, actions)(CardContainer);