const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			unique: true,
			required: true
		},
		token: String,
		userId: {
			type: mongoose.SchemaTypes.String,
			ref: "user"
		}
	},
	{
		timestamps: true,
		collection: "token",
		toObject: {
			virtuals: false
		},
		toJSON: {
			virtuals: false
		},
		_id: false
	}
);

TokenSchema.pre(/^find/, function (next) {
	this.populate({
		path: "userId",
		select: "_id"
	});

	next();
});

const token = mongoose.model("token", TokenSchema);

module.exports = token;
