const { codes } = require("../util/codes");
const { messages } = require("../util/messages");

const response_helper = require("../util/response.helper");

const get_test = async (req, res) => {
	try {
		const test_data = {
			ids: [1, 2, 3]
		};

		response_helper.success(res, undefined, test_data, messages.SUCCESS);
	} catch (error) {
		response_helper.error(res, error, error.code ? error.code : codes.ERROR, "Registering User");
	}
};

module.exports.get_test = get_test;
