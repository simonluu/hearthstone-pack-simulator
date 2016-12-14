import { VISIBILITY } from '../actions';

export default function(state = {"opacity":"0", "visible":"hidden"}, action) {
	switch(action.type) {
	case VISIBILITY:
		return action.payload;
	}
	return state;
}