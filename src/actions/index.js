import axios from 'axios';

export const FETCH_CARDS = 'FETCH_CARDS';
export const VISIBILITY = 'VISIBILITY';
export const UPDATE_PACK = 'UPDATE_PACK';
export const OPEN_PACK = 'OPEN_PACK';

const config = {
	headers: { 'X-Mashape-Key': 'i4BEtXsQLXmshazvYZg0HYAGEEoWp1weej2jsnSvQVWvOhknjd'}
};

export function fetchCardInformation(expansion) {
	var encodedExpansion = encodeURIComponent(expansion)
	var request = axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/${encodedExpansion}?collectible=1`, config);
	
	return {
		type: FETCH_CARDS,
		payload: request,
		expansion: expansion.replace(/[^A-Z0-9]/ig, "").toLowerCase()
	};

}

export function setVisibility(bool) {
	return {
		type: VISIBILITY,
		payload: bool
	}
}

export function updatePack(card) {
	return {
		type: UPDATE_PACK,
		payload: card
	}
}

export function openPack(bool, set) {
	return {
		type: OPEN_PACK,
		payload: { set, check: bool }
	}
}