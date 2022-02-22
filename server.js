const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE_URL;

/* 
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(result => console.log('Connection is SuccessFul'));
*/

const port = process.env.PORT || 3000;

//  Starting the server
app.listen(port, () => {
	console.log(`Listening on Port ${port}`);
});
