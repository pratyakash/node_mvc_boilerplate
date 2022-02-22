const database = require("../models");
const dal = require("../dal");
const responseHelper = require("../util/response.helper");
const util = require("../util");
const encryptionHelper = require("../util/encryption.helper");
const config = require("../config.helper");

const { codes } = require("../util/codes");
const { messages } = require("../util/messages");
const { db } = database;

const register = async (req, res) => {
	try {
		const { body } = req;
		const user = {};

		const isUserPresentByEmail = await util.findUserByEmail(body.email, res);
		const isUserPresentByMobile = await util.findUserByMobile(body.mobile, res);

		if (isUserPresentByEmail && isUserPresentByEmail.length > 0) {
			throw util.generateWarning(messages.EMAIL_ALREADY_EXISTS, codes.EMAIL_ALREADY_EXISTS);
		}

		if (isUserPresentByMobile && isUserPresentByMobile.length > 0) {
			throw util.generateWarning(messages.MOBILE_ALREADY_EXISTS, codes.PHONE_ALREADY_EXISTS);
		}

		user.email = body.email;
		user.firstName = body.firstName;
		user.lastName = body.lastName;
		user.mobile = body.mobile;

		const passwordObject = encryptionHelper.hashPassword(body.password);

		user.password = passwordObject.password;
		user.passwordSalt = passwordObject.salt;
		user.userType = process.env.DEFAULT_USER_GROUP;
		user.otp = util.createFourDigitRandom();

		const result = await dal.saveData(db.user, user, "user");

		if (result && result._id) {
			responseHelper.success(res, 200, { id: user._id, email: user.email }, messages.REGISTERED_SUCCESSFULLY);
		}
	} catch (error) {
		return responseHelper.error(res, error, error.code ? error.code : codes.ERROR, "Registering User");
	}
};

const login = async (req, res) => {
	try {
		const { body } = req;
		const userEmail = body.email;
		const userPassword = body.password;

		const user = await util.findUserByEmail(userEmail, res);

		if (user && user.length === 0) {
			const error = util.generateWarning(messages.USER_ID_NOT_FOUND);
			error.code = codes.EMAIL_DOESNOT_EXIST;

			throw error;
		}

		const isPasswordCorrect = encryptionHelper.validatePassword(userPassword, user[0].password, user[0].passwordSalt);

		if (!isPasswordCorrect) {
			const error = util.generateWarning(messages.INVALID_CREDENTIALS);
			error.code = codes.PASSWORD_INCORRECT;

			throw error;
		}

		const authToken = util.jwtService.createJWT(
			{
				email: user.email,
				userId: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				injectedKey: config.INJECTED_KEY
			},
			config.TOKEN_ALLOWED_FOR_HOW_LONG
		);

		const tokenData = {
			token: authToken,
			userId: user[0]._id
		};

		let token = await dal.find(db.token, { userId: user[0]._id }, res);

		if (token && token.length === 0) {
			await dal.saveData(db.token, tokenData, "token");
		} else {
			token[0].token = authToken;
			await dal.saveData(db.token, token, "token");
		}

		const userPacket = {
			token: authToken,
			user: {
				id: user[0]._id,
				firstName: user[0].firstName,
				lastName: user[0].lastName,
				userType: user[0].userType
			}
		};

		responseHelper.success(res, 200, userPacket, messages.LOGGED_IN_SUCCESSFULLY);
	} catch (error) {
		return responseHelper.error(res, error, error.code ? error.code : codes.ERROR, "Logging Error");
	}
};

const getUser = async (req, res) => {
	try {
		let where = "";

		if (req.query) {
			where = req.query;
		}

		const user = await dal.find(db.user, where);
		res.send(user);
	} catch (error) {
		console.log(error);
	}
};

module.exports.register = register;
module.exports.getUser = getUser;
module.exports.login = login;
