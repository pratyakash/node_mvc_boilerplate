const messages = {
	EMAIL_REGISTERED_SOCIAL:
		"This email is already registered through social auth. Please use login from google/facebook and then try to update your profile",
	EMAIL_ALREADY_EXISTS:
		"The email already exists. Please use a different email id to register, or use forgot password if you have forgotten your password.",
	MOBILE_ALREADY_EXISTS:
		"The mobile already exists. Please use a different mobile to register, or use forgot password if you have forgotten your password.",

	REGISTERED_SUCCESSFULLY: "Registered successfully",
	LOGGED_IN_SUCCESSFULLY: "Logged in successfully",

	USER_SAVED: "User saved successfully",
	USER_ID_NOT_FOUND: "Cannot find the user Id in database. Please check the id and try again.",

	INVALID_TOKEN: "Invalid Token",
	INVALID_CREDENTIALS: "Invalid credentials",
	EMAIL_ID_NOT_CONFIRMED: "Your email id is not confirmed yet.",

	CANNOT_AUTHENTICATE_TOKEN: "Cannot authenticate the token",
	CANNOT_READ_TOKEN: "Cannot read the token.",
	TOKEN_REFRESH_CANNOT_VALIDATE: `Couldn't validate the refresh token. Please re-login`,
	TOKEN_REFRESH_SUCCESSFULL: "Token refreshed successfully",
	TOKEN_VALID: "Token is valid",

	INVALID_PASSWORD_TOKEN: "Invalid password token",
	EXPIRED_PASSWORD_TOKEN: "Password token expired",
	INVALID_PASSWORD: "Invalid password provided",
	PASSWORD_CONFIRM_NO_MATCH: "Password and confirm password don't match",
	PASSWORD_UPDATED: "Password is updated successfully",
	PROVIDE_EMAIL_MOBILE: "Please provide either mobile or email to retreive your password",

	OTP_SENT_EMAIL_MOBILE: "The otp has been sent to registered email address and mobile number"
};

module.exports.messages = messages;
