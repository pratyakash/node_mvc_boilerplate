const database = require("../models");
const dal = require("../dal");
const responseHelper = require("../util/response.helper");
const util = require("../util");
const encryptionHelper = require("../util/encryption.helper");
const config = require("../config.helper");

const { codes } = require("../util/codes");
const { messages } = require("../util/messages");
const { db } = database;

const verifyEmailOtp = async (req, res) => {
	try {
		const { body } = req;
		const userId = body.userId;
		const otp = body.otp;

		const user = await dal.find(db.user, { _id: userId });

		if (user && user[0].otp === parseInt(otp)) {
			const updatedUser = user[0];
			updatedUser.isEmailVerified = 1;

			await dal.saveData(db.user, updatedUser);

			responseHelper.success(res, 200, {}, messages.REGISTERED_SUCCESSFULLY);
		} else {
			const error = util.generateWarning("Incorrect OTP. Please enter a valid OTP and try again");
			error.code = codes.OTP_INCORRECT;
			throw error;
		}
	} catch (error) {
		return responseHelper.error(res, error, error.code ? error.code : codes.ERROR, "OTP Verification");
	}
};

module.exports.verifyEmailOtp = verifyEmailOtp;
