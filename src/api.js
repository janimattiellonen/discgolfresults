import axios from 'axios';
import {List} from 'immutable';

export default {
	getCourses() {
		return axios.get('/api/courses').then(res => res.data.data);
	},

	getScores(versionId) {
		console.log("ss: " + versionId);
		return axios.get('/api/scores', {
			params: {
				vid: versionId
		}}).then(res => res.data.data);
	}
}