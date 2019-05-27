'use strict';

const mongoose = require('mongoose');

const { DbConfig } = require('../Config');

// Assign global promise in mongoose
mongoose.Promise = global.Promise;

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}

// Connect to MongoDB
mongoose.connect(DbConfig.mongo.URI, options, (err) => {
	if (err) {
		console.error('DB Error: ', err);
		process.exit(1);
	} else {
		console.log('MongoDB Connected');
	}
});

module.exports = mongoose;
