'use strict';

const crypto = require('crypto');
const Boom = require('boom');
const Joi = require('joi');

const CONFIG = require('../Config');

const failActionFunction = (request, reply, error) => {
	let customErrorMessage = '';
	if (error.output.payload.message.indexOf('[') > -1) {
		customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
	} else {
		customErrorMessage = error.output.payload.message;
	}
	customErrorMessage = customErrorMessage.replace(/"/g, '');
	customErrorMessage = customErrorMessage.replace('[', '');
	customErrorMessage = customErrorMessage.replace(']', '');
	error.output.payload.message = customErrorMessage;
	delete error.output.payload.validation;
	return error;
};

const sendError = (data) => {
	console.trace('ERROR OCCURED ', data)
	if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
		console.log('Attaching Response Type :::: ', data.type);
		const errorToSend = new Boom(data.customMessage, { statusCode: data.statusCode });
		errorToSend.output.payload.responseType = data.type;
		return errorToSend.output;
	} else {
		let errorToSend = '';
		if (typeof data === 'object') {
			if (data.name === 'BulkWriteError' || data.name === 'MongoError') {
				errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.DB_ERROR.customMessage;
				if (data.code === 11000) {
					let duplicateValue = data.errmsg && data.errmsg.substr(data.errmsg.lastIndexOf('{ : "') + 5);
					duplicateValue = duplicateValue.replace('}', '');
					errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.DUPLICATE.customMessage + ' : ' + duplicateValue;
				}
			} else if (data.name === 'ApplicationError') {
				errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.APP_ERROR.customMessage + ' : ';
			} else if (data.name === 'ValidationError') {
				errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.APP_ERROR.customMessage + data.message;
			} else if (data.name === 'CastError') {
				errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.DB_ERROR.customMessage + CONFIG.Constants.STATUS_MSG.ERROR.INVALID_ID.customMessage + data.value;
			}
		} else {
			errorToSend = data;
		}

		let customErrorMessage = errorToSend;
		if (typeof customErrorMessage === 'string') {
			if (errorToSend.indexOf('[') > -1) {
				customErrorMessage = errorToSend.substr(errorToSend.indexOf('['));
			}
			customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
			customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '');
			customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '');
		}
		const customErrorMessageToSend = new Boom(customErrorMessage, { statusCode: 400 });
		return customErrorMessageToSend.output;
	}
};

const sendSuccess = (successMsg, data) => {
	successMsg = successMsg || CONFIG.Constants.STATUS_MSG.SUCCESS.DEFAULT.customMessage;
	if (typeof successMsg === 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')) {
		return { statusCode: successMsg.statusCode, message: successMsg.customMessage, data: data || null };

	} else {
		return { statusCode: 200, message: successMsg, data: data || null };
	}
};

const deleteUnnecessaryUserData = (userObj) => {
	delete userObj['__v'];
	delete userObj['password'];
	delete userObj['access_token'];
	delete userObj['email_verified'];
	delete userObj['email_verified_on'];
	delete userObj['mobile_verified'];
	delete userObj['mobile_verified_on'];
	delete userObj['active'];
	delete userObj['password_modified_time'];
	delete userObj['email_verification_token'];
	delete userObj['mobile_verification_token'];
	delete userObj['password_reset_token'];
	return userObj;
};

const userProjection = {
	__v: !1,
	password: !1,
	access_token: !1,
	email_verified: !1,
	email_verified_on: !1,
	mobile_verified: !1,
	mobile_verified_on: !1,
	active: !1,
	password_modified_time: !1,
	email_verification_token: !1,
	mobile_verification_token: !1,
	password_reset_token: !1
};

const authorizationHeaderObj = Joi.object({
	// authorization: Joi.string().required()
}).unknown();

const checkObjectId = (id) => {
	const hex = /[0-9A-Fa-f]{6}/g;
	return (hex.test(id) && (id.length === 24));
};

const createRandomString = (length) => {
	let str = '';
	const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		str += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
	}
	return str;
}

const createHash = (str) => {
	if (typeof (str) === 'string' && str.length > 0) {
		const hash = crypto.createHmac('sha256', CONFIG.Constants.hashingSecret).update(str).digest('hex');
		return hash;
	} else {
		return false;
	}
};

const convertStringToSlug = (str) => {
	str = str.replace(/^\s+|\s+$/g, ''); // trim

	// // remove accents, swap ñ for n, etc
	// var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
	// var to = "aaaaaaeeeeiiiioooouuuunc------";

	// for (var i = 0, l = from.length; i < l; i++) {
	// 	str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	// }

	str = str
		.toString()
		.trim()
		.toLowerCase()
		// .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/[@#$%^&*()!="';:.,?`~{[\]}\\/]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-') // collapse dashes
		.replace(/^-+/, '') // trim - from start of text
		.replace(/-+$/, ''); // trim - from end of text

	return str;
}

const addressValidationObj = {
	type: Joi.string(),
	complete_address: Joi.string(),
	street: Joi.string(),
	city: Joi.string(),
	state: Joi.string(),
	country: Joi.string(),
	zip_code: Joi.string(),
	location: {
		type: Joi.string().valid('Point'),
		coordinates: Joi.array().items(Joi.number()).min(2).unique()
	}
};

module.exports = {
	failActionFunction,
	sendError,
	sendSuccess,
	deleteUnnecessaryUserData,
	userProjection,
	authorizationHeaderObj,
	checkObjectId,
	createRandomString,
	createHash,
	convertStringToSlug,
	addressValidationObj
};
