'use strict';

const request = require('request');
const zlib = require('zlib');

const BASE_URL = 'http://api.stackexchange.com/2.2';

const fetchQuestions = async (data) => {
    return new Promise((resolve, reject) => {
        const queryParams = {
            site: data.site,
            order: 'desc',
            sort: 'activity',
            filter: '!9Z(-wwYGT',
            ...(data.fromData && { fromData: data.fromData }),
            ...(data.toData && { toData: data.toData }),
            ...(data.pagesize && { pagesize: data.pagesize })
        };

        let req = request({
            url: `${BASE_URL}/questions`,
            qs: queryParams,
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate'
            },
            json: true
        });

        req.on('response', (questionRequest) => {
            if (questionRequest.statusCode === 200) {
                let questions;
                let buffer = [];
                let gunzip = zlib.createGunzip();

                questionRequest.pipe(gunzip);

                gunzip.on('data', function (data) {
                    // decompression chunk ready, add it to the buffer
                    buffer.push(data.toString());

                }).on("end", function () {
                    // response and decompression complete, join the buffer and return
                    questions = JSON.parse(buffer.join(''));
                    resolve(questions.items);
                });
            } else {
                reject({
                    statusCode: 400,
                    type: 'ERROR',
                    customMessage: 'Something went wrong'
                });
            }
        });

        req.on('error', () => {
            reject({
                statusCode: 400,
                type: 'ERROR',
                customMessage: 'Something went wrong'
            });
        })
    });
};

const fetchAnswers = async (data) => {
    return new Promise((resolve, reject) => {
        const queryParams = {
            site: data.site,
            order: 'desc',
            sort: 'activity',
            filter: '!9Z(-wzu0T',
            ...(data.fromData && { fromData: data.fromData }),
            ...(data.toData && { toData: data.toData }),
            ...(data.pagesize && { pagesize: data.pagesize })
        };
        let req = request({
            url: `${BASE_URL}/questions/${data.queId}/answers`,
            qs: queryParams,
            method: 'GET',
            headers: {
                'Accept-Encoding': 'gzip, deflate'
            },
            json: true
        });

        req.on('response', (questionRequest) => {
            if (questionRequest.statusCode === 200) {
                let questions;
                let buffer = [];
                let gunzip = zlib.createGunzip();

                questionRequest.pipe(gunzip);

                gunzip.on('data', function (data) {
                    // decompression chunk ready, add it to the buffer
                    buffer.push(data.toString());

                }).on("end", function () {
                    // response and decompression complete, join the buffer and return
                    questions = JSON.parse(buffer.join(''));
                    resolve(questions.items);
                });
            } else {
                reject({
                    statusCode: 400,
                    type: 'ERROR',
                    customMessage: 'Something went wrong'
                });
            }
        });

        req.on('error', () => {
            reject({
                statusCode: 400,
                type: 'ERROR',
                customMessage: 'Something went wrong'
            });
        })
    });
};

module.exports = {
    fetchQuestions,
    fetchAnswers
};
