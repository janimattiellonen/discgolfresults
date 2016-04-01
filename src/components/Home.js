import React, { Component } from 'react';
import _ from 'lodash';

import { List } from 'immutable';
import SmartSearch from 'smart-search';

export default class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		
		const { scores } = this.props;
		let fairwayCount = scores.count() > 0 ? scores.get(0).fairway_count : 0;

		return (
			<div>
				<ul>
				{scores.map((score, i) =>{
					return (
						<li key={i}>
							{_.range(fairwayCount).map(index => {
								return score['t' + (index + 1)] + ', ';
							})}
						</li>
					)
				})}	
				</ul>
			</div>
		);
	}	
};
