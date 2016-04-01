import { List } from 'immutable';
import { createServer } from './util/server';
import config from '../config.server';
import webpackConfig from '../webpack.config';
import bodyParser from 'body-parser';
import fs from 'fs';
import express from 'express';
import axios from 'axios';
import mysql from 'mysql';

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

    let scoreService = new ScoreService();

    app.get('/api/scores', function (req, res) {
        let connection = getConnection();
        scoreService.setConnection(connection);

        scoreService.getScores(10, (err, results) => {

            let course = {};

            if (results.length > 0) {
                course.code = results[0].code;
                course.name = results[0].name;
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
