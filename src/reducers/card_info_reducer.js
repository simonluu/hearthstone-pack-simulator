import { FETCH_CARDS } from '../actions';

export default function(state = {}, action) {
	switch(action.type) {
	case FETCH_CARDS:
		return { ...state, [action.expansion]: action.payload.data };
	}
	return state;
}