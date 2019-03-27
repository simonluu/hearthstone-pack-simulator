import { OPEN_PACK } from '../actions';

export default function(state = {}, action) {
	switch(action.type) {
	case OPEN_PACK:
		return action.payload;
	}
	return state;
}