'use strict';

const Joi = require('joi');

const { Constants } = require('../Config');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Controller = require('../Controllers');

module.exports = [
    {
        method: 'POST',
        path: '/api/site',
        handler: async (request, h) => {
            try {
                const data = await Controller.SiteController.create(request);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                console.error('site create err=========', err);
                const errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
        },
        config: {
            description: 'To create site',
            tags: ['api', 'site'],
            validate: {
                payload: {
                    name: Joi.string().required(),
                    icon_url: Joi.string().uri().required(),
                    site_url: Joi.string().uri().required(),
                    site_identifier: Joi.string().required()
                },
                options: {
                    allowUnknown: false
                },
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: Constants.swaggerDefaultResponseMessages
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/sites',
        handler: async (request, h) => {
            try {
                const data = await Controller.SiteController.getSites(request);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                console.error('site getSites err=========', err);
                const errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
        },
        config: {
            description: 'To get all sites',
            tags: ['api', 'site'],
            validate: {
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: Constants.swaggerDefaultResponseMessages
                }
            }
        }
    },
];
