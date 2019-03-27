import { combineReducers } from 'redux';

import CardReducer from './card_info_reducer';
import VisiblityReducer from './card_visibility_reducer';
import PackReducer from './pack_reducer';
import OpenPackReducer from './pack_open_reducer';

const rootReducer = combineReducers({
	cards: CardReducer,
	visibility: VisiblityReducer,
	pack: PackReducer,
	status: OpenPackReducer
});

export default rootReducer;
