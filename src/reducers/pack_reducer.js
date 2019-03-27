import { UPDATE_PACK } from '../actions';

export default function(state = [], action) {
	switch(action.type) {
	case UPDATE_PACK:
		if (action.payload === null) {
			return [];
		}
		return [ ...state, action.payload ];
	}
	return state;
}