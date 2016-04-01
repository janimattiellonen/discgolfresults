import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { List } from 'immutable';
import SmartSearch from 'smart-search';

import * as Utils from '../utils';

export default class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		
		const { course, scores } = this.props;
		let fairwayCount = scores.count() > 0 ? scores.get(0).fairway_count : 0;

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
						</tr>
					</thead>
					<tbody>
						{scores.map((score, i) =>{
							return (
								<tr>
									<td>{Utils.date_format(score.date)}</td>
									{_.range(fairwayCount).map(index => {
										return (<td>{score['t' + (index + 1)]}</td>)
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
};
