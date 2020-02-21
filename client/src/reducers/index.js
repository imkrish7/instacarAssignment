import { combineReducers } from 'redux';
import { createLongUrlResponse, getLongUrlResponse } from './userReducers';
const rootReducers = combineReducers({
	createLongUrlResponse,
	getLongUrlResponse
});

export default rootReducers;