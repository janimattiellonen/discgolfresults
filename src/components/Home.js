import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { List } from 'immutable';
import SmartSearch from 'smart-search';
import classNames from 'classnames';

import * as Utils from '../utils';

export default class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		
		const { course, scores } = this.props;
		let fairwayCount = course.fairway_count;

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>{course.code}</th>
							{_.range(fairwayCount).map(index => {
								return (
									<th>{(index + 1)}</th>
								)
							})}
							<th>Total</th>
						</tr>
						<tr>
							<th>Par</th>
							{_.range(fairwayCount).map(index => {
								return (
									<td>{this.getParForHole(index + 1)}</td>
								)
							})}
							<td>{course.version.total_par}</td>
						</tr>
						<tr>
							<th>Length (m)</th>
							{_.range(fairwayCount).map(index => {
								return (
									<td>{this.getHoleLength(index + 1)}</td>
								)
							})}
							<td>{course.version.total_length}</td>
						</tr>
					</thead>
					<tbody>

					</tbody>
					<tfoot>

					</tfoot>
				</table>
				<br/>
				<br/>
				<table>
					<thead>
						<tr>
							<th>{course.code}</th>
							{_.range(fairwayCount).map(index => {
								return (
									<th>{(index + 1)}</th>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{scores.map((score, i) => {
							return (
								<tr>
									<td key={'date' + i}>{Utils.date_format(score.date)}</td>
									{_.range(fairwayCount).map((index, j) => {
										let result = score['t' + (index + 1)];
										let key = 'score' + i + '-' + j;
										return (<td key={key} className={classNames(this.getScoreClass(result, j + 1))}>{result}</td>);
									})}
								</tr>
							)
						})}	
					</tbody>
					<tfoot>

					</tfoot>
				</table>
			</div>
		);
	}	

	getScoreClass(score, hole) {
		const { course } = this.props;

		const par = this.getParForHole(hole);

		if (score == 1) {
			return 'hole-ine-one';
		} else if (par - score == 1) {
			return 'birdie';
		} else if (par - score == 2) {
			return 'eagle';
		} else if (par - score == -1) {
			return 'bogey';
		} else if (par - score == -2) {
			return 'double-bogey'
		} else {
			return 'other';
		}
	}

	getParForHole(hole) {
		const { course } = this.props;

		return course.version.holes[hole - 1].par;
	}

	getHoleLength(hole) {
		const { course } = this.props;

		return course.version.holes[hole - 1].length;
	}
};
