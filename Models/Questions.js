'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Questions = new Schema({
	title: { type: String, trim: true, required: true },
	que_id: { type: Number, required: true },
	link: { type: String, trim: true, required: true },
	body: { type: String, trim: true, required: true },
	tags: [{ type: String }],
	answer_count: { type: Number, default: 0 },
	view_count: { type: Number, default: 0 },
	creation_date: { type: Date, required: true },
	last_activity_date: { type: Date },
	owner: {
		user_id: { type: Number, required: true },
		reputation: { type: Number, default: 0 },
		profile_image: { type: String, default: null },
		display_name: { type: String, required: true },
		link: { type: String, required: true }
	},
	site: { type: String, trim: true, required: true }
});

module.exports = mongoose.model('Questions', Questions);
