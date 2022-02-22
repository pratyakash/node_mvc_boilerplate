const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/user");
const otpRouter = require("./routes/otp");

// * MiddleWares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

/* 
  TODO: Create a middleware for the auth tokens,
  TODO: Think about the OPR Key for the simple
*/

// app.use((req, res, next) => {
//   const isOprCorrect = req.headers.access_token === process.env.OPR_KEY;

//   if (isOprCorrect) {
//     // *Do Nothing
//   } else {
//     return responseHelper.unauthorized(res);
//   }

//   next();
// });

//Routes
app.use("/api/accounts", userRouter);
app.use("/api/otp", otpRouter);

module.exports = app;
