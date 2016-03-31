import axios from 'axios';
import {List} from 'immutable';

export default {
	getDiscs() {
		return axios.get('/api/discs').then(res => res.data.data);
	}
}