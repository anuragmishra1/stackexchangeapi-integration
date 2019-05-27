'use strict';

const Services = require('../Services');
const { Constants } = require('../Config');

const create = async (request) => {
    try {
        await Services.Sites.create(request.payload, request);
    } catch (err) {
        throw err;
    }
    return Constants.STATUS_MSG.SUCCESS.CREATED;
};

const getSites = async (request) => {
    let sites = [];
    try {
        sites = await Services.Sites.find({}, {}, {}, {});
    } catch (err) {
        throw err;
    }
    return sites;
};

module.exports = {
    create,
    getSites
};
