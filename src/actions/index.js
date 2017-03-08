import axios from 'axios';

export const FETCH_CARDS = 'FETCH_CARDS';
export const VISIBILITY = 'VISIBILITY';

const config = {
	headers: { 'X-Mashape-Key': 'i4BEtXsQLXmshazvYZg0HYAGEEoWp1weej2jsnSvQVWvOhknjd'}
};

export function fetchCardInformation(expansion) {
	var encodedExpansion = encodeURIComponent(expansion)
	var request = axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/sets/${encodedExpansion}?collectible=1`, config);
	
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