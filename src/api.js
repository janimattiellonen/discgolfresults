import axios from 'axios';
import {List} from 'immutable';

export default {
	getCourses() {
		return axios.get('/api/courses').then(res => res.data.data);
	},

	getScores() {
		return axios.get('/api/scores').then(res => res.data.data);
	}
}