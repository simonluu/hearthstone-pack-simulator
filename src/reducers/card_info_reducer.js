import { FETCH_CARDS } from '../actions';

export default function(state = {}, action) {
	switch(action.type) {
	case FETCH_CARDS:
		return action.payload;
	}
	return state;
}