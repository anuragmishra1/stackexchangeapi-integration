'use strict';

const CONFIG = require('../Config');
const Services = require('../Services');
const { StackExchangeService } = require('../Lib');

const fetchAndStoreQuestions = async (request) => {
	if (request.query.fromDate) {
		const fromDate = typeof (request.query.fromDate) === 'object'
			&& Date.parse(request.query.fromDate) !== NaN ? Date.parse(request.query.fromDate) : false;
		if (!fromDate) return {
			statusCode: 400,
			customMessage: 'Make sure you are passing proper date in fromData parameter',
			type: 'DATA_ERROR'
		}
	}
	if (request.query.toDate) {
		const toDate = typeof (request.query.toDate) === 'object'
			&& Date.parse(request.query.toDate) !== NaN ? Date.parse(request.query.toDate) : false;
		if (!toDate) return {
			statusCode: 400,
			customMessage: 'Make sure you are passing proper date in toData parameter',
			type: 'DATA_ERROR'
		}
	}

	let questionsList = [];
	try {
		questionsList = await StackExchangeService.fetchQuestions(request.query);
	} catch (error) {
		throw error;
	}

	storeQuestionsInDB(questionsList, request.query.site);

	return questionsList;
};

const storeQuestionsInDB = async (questions, site) => {
	const questionList = [];
	for (let item of questions) {
		questionList.push({
			title: item.title,
			que_id: item.question_id,
			link: item.link,
			body: item.body,
			tags: item.tags,
			answer_count: item.answer_count,
			view_count: item.view_count,
			creation_date: item.creation_date,
			owner: {
				user_id: item.owner.user_id,
				reputation: item.owner.reputation,
				profile_image: item.owner.profile_image,
				display_name: item.owner.display_name,
				link: item.owner.link
			},
			site: site
		});
	}

	try {
		await Services.Questions.insertMany(questionList);
	} catch (error) {
		throw error;
	}
};

const getQuestions = async (request) => {
	let questions = [];
	const criteria = {
		site: request.query.site
	};
	const options = {
		limit: request.query.limit || 0,
		skip: request.query.skip || 0
	};
	try {
		questions = await Services.Questions.find(criteria, {}, options, {});
	} catch (err) {
		throw err;
	}
	return questions;
};

const getAnswers = async (request) => {
	if (request.query.fromDate) {
		const fromDate = typeof (request.query.fromDate) === 'object'
			&& Date.parse(request.query.fromDate) !== NaN ? Date.parse(request.query.fromDate) : false;
		if (!fromDate) return {
			statusCode: 400,
			customMessage: 'Make sure you are passing proper date in fromData parameter',
			type: 'DATA_ERROR'
		}
	}
	if (request.query.toDate) {
		const toDate = typeof (request.query.toDate) === 'object'
			&& Date.parse(request.query.toDate) !== NaN ? Date.parse(request.query.toDate) : false;
		if (!toDate) return {
			statusCode: 400,
			customMessage: 'Make sure you are passing proper date in toData parameter',
			type: 'DATA_ERROR'
		}
	}

	const data = request.query;
	data.queId = request.params.queId;

	let answersList = [];
	try {
		answersList = await StackExchangeService.fetchAnswers(request.query);
	} catch (error) {
		throw error;
	}
	return answersList;
};

module.exports = {
	fetchAndStoreQuestions,
	getQuestions,
	getAnswers
};
