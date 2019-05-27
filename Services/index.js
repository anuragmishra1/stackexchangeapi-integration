'use strict';

module.exports = {
	Sites: require('./DbWrapper')('Sites'),
	Questions: require('./DbWrapper')('Questions')
};
