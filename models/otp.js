const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
	{
		number: String,
		userId: {
			type: mongoose.SchemaTypes.String,
			ref: "user"
		},
		otpExpiresAt: Date
	},
	{
		timestamps: true,
		collection: "otp"
	}
);

OtpSchema.pre(/^find/, function (next) {
	this.populate({
		path: "userId"
	});

	next();
});

const otp = mongoose.model("otp", OtpSchema);

module.exports = otp;
