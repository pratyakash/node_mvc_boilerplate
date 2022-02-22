const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			unique: true,
			required: true
		},
		firstName: {
			type: String
		},
		lastName: String,
		email: {
			type: String,
			required: [true, "Must have an email"],
			unique: true
		},
		isEmailVerified: {
			type: Number,
			default: 0
		},
		password: {
			type: String
		},
		passwordSalt: {
			type: String
		},
		mobile: {
			type: Number,
			unique: true
		},
		isAdminVerified: {
			type: Number,
			default: 0
		},
		userType: {
			type: String
		},
		otp: {
			type: Number
		}
	},
	{
		timestamps: true,
		collection: "user",
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}
);

UserSchema.virtual("token", {
	ref: "token",
	foreignField: "userId",
	localField: "_id"
});
// UserSchema.virtual('otp', {
//   ref: 'otp',
//   foreignField: 'userId',
//   localField: '_id'
// });

const user = mongoose.model("user", UserSchema);

module.exports = user;
