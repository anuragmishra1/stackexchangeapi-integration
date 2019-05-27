'use strict';

// External Dependencies
const Hapi = require('hapi');

// Internal Dependencies
const Routes = require('./Routes');
const Plugins = require('./Plugins');
const Config = require('./Config');

require('./Utils/BootStrap');

const main = async () => {
	// create new server instance and connection information
	const server = await new Hapi.Server({
		host: Config.ServerConfig.server.host,
		port: Config.ServerConfig.server.port,
		routes: {
			cors: {
				origin: ['*'],
				additionalHeaders: [],
				credentials: true
			}
		}
	});

	// Register All Plugins
	await server.register(Plugins);

	// Start Server
	try {
		await server.start();
		console.log('Server running at:', server.info.uri);
	} catch (err) {
		console.error('Error while running server: ', err);
	}

	// listen on SIGINT signal and gracefully stop the server
	process.on('SIGINT', () => {
		console.log('stopping hapi server');
		server.stop({ timeout: 10000 }).then(function (err) {
			console.log('hapi server stopped');
			process.exit((err) ? 1 : 0);
		});
	});

	// listen on unhandledRejection signal
	process.on('unhandledRejection', (err) => {
		console.error('Unhandled Rejection error: ', err);
		process.exit(1);
	});

	//API Routes
	server.route(Routes);

	return server;
};
main();

module.exports = {
	main
};
