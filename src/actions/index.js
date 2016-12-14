import axios from 'axios';

export const FETCH_CARDS = 'FETCH_CARDS';
export const VISIBILITY = 'VISIBILITY';

const config = {
	headers: { 'X-Mashape-Key': 'i4BEtXsQLXmshazvYZg0HYAGEEoWp1weej2jsnSvQVWvOhknjd'}
};

export function fetchCardInformation() {
	var request = axios.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/Mean%20Streets%20of%20Gadgetzan?collectible=1', config);
	
	return {
		type: FETCH_CARDS,
		payload: request
	};

}

export function setVisibility(bool) {
	return {
		type: VISIBILITY,
		payload: bool
	}
}