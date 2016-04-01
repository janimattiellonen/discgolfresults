import moment from 'moment';

export function date_format(date, format = "D.M.YYYY") {
	return date != null && date != undefined ? moment(date).format(format) : '';
}