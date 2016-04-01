import axios from 'axios';
import {List} from 'immutable';

export default {
	getScores() {
		return axios.get('/api/scores').then(res => res.data.data);
	}
}