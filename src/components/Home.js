import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { List, OrderedMap } from 'immutable';
import SmartSearch from 'smart-search';
import classNames from 'classnames';
import Select from 'react-select';

import * as Utils from '../utils';
import ScoreTable from './ScoreTable';

export default class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			course: null,
			layout: null,
			version: null
		};
	}

	handleCourseChange(val) {
		console.log("cccid: " + val);

		if (val) {
			this.setState({
				course: val.value
			});

			this.props.courseActions.selectCourse(val.value);
		}
	}


	handleLayoutChange(val) {
		if (val) {
			this.setState({
				layout: val.value
			});

			this.props.courseActions.selectLayout(val.value);
		}
	}

	handleVersionChange(val) {
		if (val) {
			this.setState({
				version: val.value
			});

			this.props.scoreActions.getScores(val.value);
		}
	}

	render() {
		const { course, courses, layouts, versions, version, scores } = this.props;

		let courseOptions = [];
		let layoutOptions = [];
		let versionOptions = [];

		courses.map(c => {
			courseOptions.push({
				value: c.id,
				label: c.code
			});
		});

		layouts.map(l => {
			layoutOptions.push({
				value: l.id,
				label: l.layout
			});
		});

		versions.map(v => {
			versionOptions.push({
				value: v.id,
				label: v.version
			});
		});

		let worstScores = this.getWorstScores();
		let bestScores = this.getBestScores();

		let worstAndBest = bestScores.concat(worstScores);

		return (
			<div>
				<div className="search-container">

					<label for="course-select">Course</label>
					<Select
						id="course-select"
						value={this.state.course}
						options={courseOptions}
						onChange={::this.handleCourseChange}
					/>

					<label for="layout-select">Layout</label>
					<Select
						id="layout-select"
						value={this.state.layout}
						options={layoutOptions}
						onChange={::this.handleLayoutChange}
					/>

					<label for="version-select">Version</label>
					<Select
						id="version-select"
						value={this.state.version}
						options={versionOptions}
						onChange={::this.handleVersionChange}
					/>
				</div>

				<div className="scores-container">
					<ScoreTable course={course} version={version} scores={worstAndBest} />
					<br/>
					<br/>
					<ScoreTable course={course} version={version} scores={scores} />
				</div>
			</div>
		);
	}	

	getBestScores() {
		const { course, scores } = this.props;

		if (!course.version) {
			return List();
		}

 		let bestScores = OrderedMap();

 		scores.map((score, i) => {
 			_.range(course.fairway_count).map((index, j) => {
	 			let result = score['t' + (j + 1)];
	 			let currentBestResult = bestScores.get(j);

	 			if (!currentBestResult || result < currentBestResult) {
	 				bestScores = bestScores.set(j, result);
	 			}
 			});
 		});

 		let total = _.sum(bestScores.toArray());

 		let obj = {
 			date: null,
 			total: total,
 			score: total - course.version.total_par,
 		};

 		bestScores.map((score, i) => {
 			obj['t' + (i + 1)] = score;
 		});

 		return List([obj]);
	}

	getWorstScores() {
		const { course, scores } = this.props;

		if (!course.version) {
			return List();
		}

 		let bestScores = OrderedMap();

 		scores.map((score, i) => {
 			_.range(course.fairway_count).map((index, j) => {
	 			let result = score['t' + (j + 1)];
	 			let currentBestResult = bestScores.get(j);

	 			if (!currentBestResult || result > currentBestResult) {
	 				bestScores = bestScores.set(j, result);
	 			}
 			});
 		});

 		let total = _.sum(bestScores.toArray());

 		let obj = {
 			date: null,
 			total: total,
 			score: total - course.version.total_par,
 		};

 		bestScores.map((score, i) => {
 			obj['t' + (i + 1)] = score;
 		});

 		return List([obj]);
	}
};



Home.defaultProps = {
    version: {
    	total_length: 0,
    	total_par: 0
    }
};
