'use strict';

const SiteRoutes = require('./SiteRoutes');
const QuestionRoutes = require('./QuestionRoutes');

const pingRoute = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return {
                status: 200,
                message: 'API Server is UP!'
            };
        }
    }
];

const all = pingRoute.concat(
    SiteRoutes,
    QuestionRoutes
);

module.exports = all;
