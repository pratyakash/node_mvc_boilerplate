const user = require("./user");
const token = require("./token");
const otp = require("./otp");

const db = {
	user,
	token,
	otp
};

//load the models
module.exports.db = db;
