const crypto = require("crypto");
const config = require("../config.helper");

const randomBytes = (len, encoding) => {
	return crypto.randomBytes(len).toString(encoding || "hex");
};

/**
 *
 * @param {String} password the password to be encrypted
 *
 * This function will generate a random salt, and will encrypt the password using that salt
 *
 *  @returns: {
 *      password,
 *      salt
 *  }
 */
const hashPassword = (password, salt) => {
	if (!salt) salt = randomBytes(16);
	const hashedPassword = crypto.pbkdf2Sync(password, salt, config.PASSWORD_ITERATIONS, 25, "sha512");

	return {
		password: hashedPassword.toString("hex"),
		salt
	};
};

const validatePassword = (attemptedPassword, hashedPassword, salt) => {
	return hashPassword(attemptedPassword, salt).password === hashedPassword;
};

const md5 = textToHash => {
	return crypto.createHash("md5").update(textToHash).digest("hex");
};

module.exports.hashPassword = hashPassword;
module.exports.validatePassword = validatePassword;
module.exports.randomBytes = randomBytes;
module.exports.md5 = md5;
