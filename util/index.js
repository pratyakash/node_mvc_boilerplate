const uuid = require("uuid/v4");

const dal = require("../dal");
const { db } = require("../models");
const { codes } = require("./codes");
const config = require("../config.helper");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const publicKey = fs.readFileSync(__dirname + "/keys/public.key", "utf8").toString();
const privateKey = fs.readFileSync(__dirname + "/keys/private.key", "utf8").toString();

const generateWarning = (message, code) => {
	const error = new Error(message);
	error.warning = true;
	error.code = code || "";

	return error;
};

const drillDownErrorMessage = error => {
	let errorMessage = error.message;

	if (error.errors && error.errors.length > 0) {
		error.errors.forEach(err => {
			if (err.message) {
				errorMessage = errorMessage + ". " + err.message;
			}
		});
	}

	return errorMessage;
};

const verifyAccessLevel = (req, res) => {};

const findUserByEmail = async (email, res) => {
	const user = await dal.find(db.user, { email }, res);

	return user;
};

const findUserByMobile = async (mobile, res) => {
	const user = await dal.find(db.user, { mobile }, res);

	return user;
};

const generateUuid = model => {
	let prefix = process.env.NODE_ENV === "developement" ? "dev_" : "";
	const randomId = uuid();

	switch (model) {
		case "user":
			prefix += `usr_${randomId}`;
			break;
		case "token":
			prefix += `tok_${randomId}`;
			break;
		default:
			break;
	}

	return prefix;
};

const jwtService = {
	_options: {
		issuer: config.JWT.ISSUER,
		audience: config.JWT.AUDIENCE,
		subject: config.JWT.SUBJECT
	},

	createJWT: (objectToEncrypt, expiresIn) => {
		return jwt.sign(objectToEncrypt, privateKey, {
			...this._options,
			algorithm: config.JWT.ALGORITHM,
			expiresIn
		});
	},

	verifyJWT: token => {
		try {
			return jwt.verify(token, publicKey, {
				...this._options,
				algorithm: [config.JWT.ALGORITHM]
			});
		} catch (error) {
			return {
				error,
				isError: true
			};
		}
	},

	decode: token => {
		try {
			var decoded = jwt.decode(token, _options);
			return decoded;
		} catch (error) {
			return {
				error,
				isError: true
			};
		}
	}
};

const tokenIsValid = token => {
	const decoded = jwtService.verifyJWT(token);

	if (decoded.isError) {
		if (decoded.error.name === "TokenExpiredError") {
			decoded.error.code = codes.TOKEN_AUTH_EXPIRED;
		} else {
			decoded.error.code = codes.TOKEN_AUTH_CORRUPTED;
		}
	}

	// either true of the error
	return decoded;
};

const createFourDigitRandom = () => {
	return Math.floor(1000 + Math.random() * 9000);
};

module.exports.verifyAccessLevel = verifyAccessLevel;
module.exports.findUserByEmail = findUserByEmail;
module.exports.findUserByMobile = findUserByMobile;
module.exports.generateWarning = generateWarning;
module.exports.generateUuid = generateUuid;
exports.jwtService = jwtService;
module.exports.drillDownErrorMessage = drillDownErrorMessage;
module.exports.createFourDigitRandom = createFourDigitRandom;
