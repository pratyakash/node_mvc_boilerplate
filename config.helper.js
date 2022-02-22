const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const config = {
	JWT: {
		ISSUER: "Giveaway Manager",
		SUBJECT: "Auth Token",
		AUDIENCE: "USERS",
		ALGORITHM: "RS256"
	},
	ENCRYPTION_KEY: process.env.ENCRYPTION_KEY, // this key will be used to encrypt and decrypt any token
	INJECTED_KEY: process.env.INJECTED_KEY, // this key will be used to identify the jsonwebtoken
	JWT_SECRET: process.env.JWT_SECRET,
	PASSWORD_ITERATIONS: 100,
	TOKEN_ALLOWED_FOR_HOW_LONG: process.env.JWT_EXPIRES
};

module.exports = config;
