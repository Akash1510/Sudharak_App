const { connect } = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      autoIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;
