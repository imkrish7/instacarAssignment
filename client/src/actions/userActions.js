import { getActionStates } from '../Utils/utility';
import axios from 'axios';

export const CREATE_LONG_URL = "CREATE_LONG_URL";
export const GET_LONG_URL = "GET_LONG_URL";




const apiRequest = (dispatch, params, url, requestType, successActions, loadingActions, errorActions) => {
	
	let headers = { 'Content-Type': 'application/json' };

	// const defaultUrl = 'http://127.0.0.1:5000';

	let reqObj = { method: requestType, url: url, data: JSON.stringify(params), headers };

	if(dispatch && loadingActions ) dispatch(loadingActions(true));

	axios(reqObj).then(res => {
		if (dispatch && loadingActions) dispatch(loadingActions(false));

		if(dispatch && successActions)
			dispatch(successActions(res.data));
	}).catch(error=>{
		console.log(error);
		if(dispatch && errorActions)
		 	dispatch(errorActions(error.response))
	})

}
export const createLongUrlSuccess = (data) => {

	return {
		type: getActionStates(CREATE_LONG_URL).success,
		data
	}
}

export const createLongUrlErrored = (error) => {
	return {
		type: getActionStates(CREATE_LONG_URL).failure,
		error
	}
}

export const createLongUrlLoading = (loading) => {
	return {
		type: getActionStates(CREATE_LONG_URL).inProgress,
		loading
	}
}

export const createLongUrl = (params) => {
	const url = '/api/add';
	const requestType = 'post';
	return dispatch => apiRequest(dispatch, params, url, requestType,createLongUrlSuccess, createLongUrlLoading, createLongUrlErrored)
}

export const getLongUrlSuccess = (data) => {

	return {
		type: getActionStates(GET_LONG_URL).success,
		data
	}
}

export const getLongUrlErrored = (error) => {
	return {
		type: getActionStates(GET_LONG_URL).failure,
		error
	}
}

export const getLongUrlLoading = (loading) => {
	return {
		type: getActionStates(GET_LONG_URL).inProgress,
		loading
	}
}

export const getLongUrl = (params) => {
	const url = '/api/list';
	const requestType = 'get';
	return dispatch => apiRequest(dispatch, params, url, requestType, getLongUrlSuccess, getLongUrlLoading, getLongUrlErrored)
}