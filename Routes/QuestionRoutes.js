'use strict';

const Joi = require('joi');

const CONFIG = require('../Config');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Controller = require('../Controllers');

module.exports = [
	{
		method: 'GET',
		path: '/api/fetch_and_store_questions',
		handler: async (request, h) => {
			try {
				const data = await Controller.QuestionController.fetchAndStoreQuestions(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('question fetchAndStoreQuestions err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'Fetch the question from StackExchange API and store in our DB',
			tags: ['api', 'question'],
			validate: {
				query: {
					site: Joi.string().valid('stackoverflow', 'dba').required(),
					pagesize: Joi.number(),
					fromDate: Joi.date(),
					toDate: Joi.date()
				},
				headers: UniversalFunctions.authorizationHeaderObj,
				failAction: UniversalFunctions.failActionFunction
			},
			plugins: {
				'hapi-swagger': {
					responseMessages: CONFIG.Constants.swaggerDefaultResponseMessages
				}
			}
		}
	},
	{
		method: 'GET',
		path: '/api/questions',
		handler: async (request, h) => {
			try {
				const data = await Controller.QuestionController.getQuestions(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('question getQuestions err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'Get questions from the database',
			tags: ['api', 'question'],
			validate: {
				query: {
					limit: Joi.number(),
					skip: Joi.number(),
					site: Joi.string().valid('stackoverflow', 'dba').required(),
				},
				headers: UniversalFunctions.authorizationHeaderObj,
				failAction: UniversalFunctions.failActionFunction
			},
			plugins: {
				'hapi-swagger': {
					responseMessages: CONFIG.Constants.swaggerDefaultResponseMessages
				}
			}
		}
	},
	{
		method: 'GET',
		path: '/api/question/{queId}/answers',
		handler: async (request, h) => {
			try {
				const data = await Controller.QuestionController.getAnswers(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('question getAnswers err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'Get answers of particular question',
			tags: ['api', 'question'],
			validate: {
				params: {
					queId: Joi.string().required()
				},
				query: {
					limit: Joi.number(),
					skip: Joi.number(),
					site: Joi.string().valid('stackoverflow', 'dba').required(),
					pagesize: Joi.number(),
					fromDate: Joi.date(),
					toDate: Joi.date()
				},
				headers: UniversalFunctions.authorizationHeaderObj,
				failAction: UniversalFunctions.failActionFunction
			},
			plugins: {
				'hapi-swagger': {
					responseMessages: CONFIG.Constants.swaggerDefaultResponseMessages
				}
			}
		}
	}
];
