'use strict';

// Normalize a port into a number, string, or false.
const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
};

const server = {
	host: process.env.HOST || '0.0.0.0',
	port: normalizePort(process.env.PORT || '3000')
};

const swaggerOptions = {
	info: {
		title: 'Stackoverflow Wrapper API Documentation',
		version: '1.0.0',
	},
	grouping: 'tags',
	sortTags: 'name',
	expanded: 'none',
	securityDefinitions: {
		Bearer: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header',
			// 'x-keyPrefix': 'Bearer '
		}
	},
	security: [{ 'Bearer': [] }],
	jsonPath: '/swagger.json',
	basePath: '/api',
	documentationPath: '/explorer',
	swaggerUI: false,
	sortEndpoints: 'method'
};

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
	swaggerOptions.host = `${server.host}:${server.port}`;
}

module.exports = {
	server,
	swaggerOptions,
};
