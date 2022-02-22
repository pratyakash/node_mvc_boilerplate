const responseHelper = require("../util/response.helper");
const util = require("../util");

const { codes } = require("../util/codes");

const saveData = async (model, body, type, res) => {
	let newRecord = true;

	try {
		if (body._id) newRecord = false;

		if (newRecord) {
			body._id = util.generateUuid(type);
			const result = await model.create(body);
			return result;
		} else {
			const result = model.findOneAndUpdate({ _id: body._id }, body);
			return result;
		}
	} catch (error) {
		return responseHelper.error(res, error, error.code ? error.code : codes.ERROR, `Error in saving data in ${model}`);
	}
};

const find = async (model, query, res) => {
	try {
		const queryObject = { ...query };
		console.log(queryObject);
		const excludedFields = ["limit", "sort", "page", "fields"];

		excludedFields.forEach(data => delete queryObject[data]);

		let queryStr = JSON.stringify(queryObject);
		queryStr = queryStr.replace(/\b(eq|gte|gt|lt|lte|)\b/g, match => {
			if (match && match.length > 0) {
				return `$${match}`;
			}
			return match;
		});

		console.log("String", queryStr);

		let queryApplied = model.find(JSON.parse(queryStr));

		if (query.sort) {
			const sortBy = query.sort.split(",").join(" ");
			queryApplied = queryApplied.sort(sortBy);
		} else {
			queryApplied = queryApplied.sort("createdAt");
		}

		const page = query.page * 1 || 1;
		const limit = query.limit * 1 || 100;
		const skip = (page - 1) * limit;

		queryApplied = queryApplied.skip(skip).limit(limit);

		if (query.page) {
			const resultCount = model.countDocuments();

			if (skip >= resultCount) {
				throw new Error("End Of Page");
			}
		}

		const result = await queryApplied;

		return result;
	} catch (error) {
		return responseHelper.error(res, error, error.code ? error.code : codes.ERROR, `Error in Finding data in ${model}`);
	}
};

module.exports.saveData = saveData;
module.exports.find = find;
