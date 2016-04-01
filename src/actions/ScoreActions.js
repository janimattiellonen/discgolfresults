import api from '../api';

export function loadScores(scores) {
	return {
		type: 'SCORES_LOAD',
		payload: score
	}
}

export function getScores() {
	return function(dispatch, getState) {
		api.getScores().then(scores => {
			return dispatch(loadScores(scores));
		}).catch((response) => {

		});
	};
}