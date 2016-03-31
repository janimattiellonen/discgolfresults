import api from '../api';

export function loadDiscs(discs) {
	return {
		type: 'DISCS_LOAD',
		payload: discs
	}
}

export function getDiscs() {
	return function(dispatch, getState) {
		api.getDiscs().then(discs => {
			return dispatch(loadDiscs(discs));
		}).catch((response) => {

		});
	};
}