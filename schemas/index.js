const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
	try {
		const connect = await mongoose.connect(process.env.DB_CONNECT);
		console.log("MongoDB 연결에 성공하였습니다.");
	} catch (err) {
		console.log(`MongoDB 연결에 실패하였습니다. ${err}`);
	}
};

module.exports = dbConnect;
