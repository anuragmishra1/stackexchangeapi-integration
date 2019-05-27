'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sites = new Schema({
    name: { type: String, trim: true, index: true, required: true },
    icon_url: { type: String, trim: true },
    site_url: { type: String, trim: true },
    site_identifier: { type: String, trim: true, index: true }
});

module.exports = mongoose.model('Sites', Sites);
