'use strict';

const Models = require('../Models');

module.exports = function (model) {
	const module = {};

	module.find = async (criteria, projection, options, populateQuery) => {
		options.lean = true;
		if (populateQuery && Object.keys(populateQuery).length > 0) {
			return await Models[model].find(criteria, projection, options).populate(populateQuery).exec();
		} else {
			return await Models[model].find(criteria, projection, options);
		}
	};

	module.findOne = async (criteria, projection, options, populateQuery) => {
		options.lean = true;
		if (populateQuery && Object.keys(populateQuery).length > 0) {
			return await Models[model].findOne(criteria, projection, options).populate(populateQuery).exec();
		} else {
			return await Models[model].findOne(criteria, projection, options);
		}
	};

	module.findById = async (id, populateQuery) => {
		if (populateQuery && Object.keys(populateQuery).length > 0) {
			return await Models[model].findById(id).populate(populateQuery).exec();
		} else {
			return await Models[model].findById(id);
		}
	};

	module.create = async (objToSave) => {
		const data = await new Models[model](objToSave).save();
		return data.toObject();
	};

	module.insertMany = async (objToSave) => {
		return await Models[model].insertMany(objToSave);
	};

	module.update = async (criteria, dataToSet, options) => {
		options.lean = true;
		options.new = true;
		return await Models[model].findOneAndUpdate(criteria, dataToSet, options);
	};

	module.updateMany = async (criteria, dataToSet, options) => {
		return await Models[model].updateMany(criteria, dataToSet, options);
	};

	module.deleteOne = async (criteria) => {
		return await Models[model].deleteOne(criteria);
	};

	module.count = async (criteria) => {
		return await Models[model].countDocuments(criteria);
	};

	module.aggregate = async (group, populateQuery) => {
		if (populateQuery) {
			const result = await Models[model].aggregate(group);
			return await Models[model].populate(result, populateQuery);
		} else {
			return await Models[model].aggregate(group);
		}
	};

	module.findOneAndUpdate = async (criteria, dataToSet, options) => {
		options = {
			...options,
			upsert: true,
			new: true,
			setDefaultsOnInsert: true
		};
		return await Models[model].findOneAndUpdate(criteria, { $set: dataToSet }, options);
	};
	return module;
};
