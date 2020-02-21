import { getActionStates } from '../Utils/utility';
import { CREATE_LONG_URL, GET_LONG_URL } from '../actions/userActions';
import { successState, loadingState, errorState } from './defaultstates';


export function createLongUrlResponse(state = {}, action){
	switch (action.type) {
		case getActionStates(CREATE_LONG_URL).success:
			return { ...successState, data: action.data };
		case getActionStates(CREATE_LONG_URL).inProgress:
			return { ...loadingState, loading: action.loading };
		case getActionStates(CREATE_LONG_URL).failure:
			return { ...errorState, error: action.error };
		default:
			return state;
	}
}

export function getLongUrlResponse(state = {}, action){
	switch (action.type) {
		case getActionStates(GET_LONG_URL).success:
			return { ...successState, data: action.data };
		case getActionStates(GET_LONG_URL).inProgress:
			return { ...loadingState, loading: action.loading };
		case getActionStates(GET_LONG_URL).failure:
			return { ...errorState, error: action.error };
		default:
			return state;
	}
}