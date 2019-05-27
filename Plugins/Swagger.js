'use strict';

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const Config = require('../Config');

// Register Swagger
const register = async (server, options) => {
	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: Config.ServerConfig.swaggerOptions
		}
	]);
};

module.exports = {
	register
};
