import { combineReducers } from 'redux';

import CardReducer from './card_info_reducer';
import VisiblityReducer from './card_visibility_reducer';

const rootReducer = combineReducers({
	cards: CardReducer,
	visibility: VisiblityReducer
});

export default rootReducer;
