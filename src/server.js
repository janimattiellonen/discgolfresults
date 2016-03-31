import { List } from 'immutable';
import { createServer } from './util/server';
import config from '../config.server';
import webpackConfig from '../webpack.config';
import bodyParser from 'body-parser';
import fs from 'fs';
import express from 'express';
import axios from 'axios';

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

    app.get('/api/scores', function (req, res) {

        res.status(200).json({ok: true});
    });

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
