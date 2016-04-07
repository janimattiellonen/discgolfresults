import { List } from 'immutable';
import { createServer } from './util/server';
import config from '../config.server';
import webpackConfig from '../webpack.config';
import bodyParser from 'body-parser';
import fs from 'fs';
import express from 'express';
import axios from 'axios';
import mysql from 'mysql';
import _ from 'lodash';
import {OrderedMap} from 'immutable';


import CourseService from './services/CourseService';
import ScoreService from './services/ScoreService';

const ENV = process.env.NODE_ENV;

function getAuthorizationHeaders() {
    return {
        headers: {

        }
    };
};

var headers = getAuthorizationHeaders();

createServer(config, webpackConfig, (app) => {
    app.use(bodyParser({limit: '50mb'}));
    app.use(express.static('web'));

    let courseService = new CourseService();
    let scoreService = new ScoreService();

    app.get('/api/courses', (req, res) => {
        let connection = getConnection();
        courseService.setConnection(connection);

        courseService.getCourses((err, results) => {
            let courses = OrderedMap();

            results.map(result => {
                var course = courses.get(result.cid);

                if (null == course) {
                    course = {
                        id: result.cid,
                        name: result.name,
                        code: result.code,
                        layouts: OrderedMap()
                    }
                }

                var layout = course.layouts.get(result.lid);

                if (null == layout) {
                    layout = {
                        id: result.lid,
                        description: result.description,
                        layout: result.layout,
                        versions: OrderedMap()
                    };
                }

                var version = layout.versions.get(result.vid);

                if (null == version) {
                    version = {
                        id: result.vid,
                        version: result.version
                    };
                }

                layout.versions = layout.versions.set(result.vid, version);

                course.layouts = course.layouts.set(result.lid, layout);

                courses = courses.set(result.cid, course);
            });

            // must convert courses.layouts to array
            // must convert courses.layouts[x].versions to array
            courses = courseService.toArray(courses);

            res.status(200).json({data: courses});
        });
    });

    app.get('/api/scores', (req, res) => {
        let connection = getConnection();
        scoreService.setConnection(connection);

console.log(JSON.stringify(req.query));
        let vid = req.query.vid || 10;

        scoreService.getScores(vid, (err, results) => {

            let course = {};

            if (results.length > 0) {
                let result = results[0];

                course.code = result.code;
                course.name = result.name;
                course.fairway_count = result.fairway_count;

                let holes = [];

                _.range(result.fairway_count).map(index => {
                    holes.push({
                        number: (index + 1),
                        par: result['par_' + (index + 1)],
                        length: result['lenght_' + (index + 1)]
                    });
                });

                let version = {
                    holes: holes,
                    total_par: result.par_total,
                    total_length: result.lenght_total
                };

                course.version = version;
            }

            let data = {
                course:  course,
                results: results,
            };

            res.status(200).json({data: data});
        });
    });

    function getConnection() {
        let connection = mysql.createConnection({
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database
        });

        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {

                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }

                return txt;
            }.bind(this));
        };

        connection.connect();

        return connection;
    }        

    function handleError(err, res) {
        if(err) {
            console.log("Request failed: " + err);

            let result = {
                status: false,
                message: 'Request failed due to server error'
            };

            res.charSet = 'utf8';
            res.status(500).json(result);
        }
    }
});
