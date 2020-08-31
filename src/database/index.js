const mongoose = require("mongoose");
const schemas = require("./models");

const connectMongoDB = async () => {
  try {
    const { MONGO_DB_URL } = process.env;
    const connection = await mongoose.connect(MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    connection
      ? console.log("Database connection successful")
      : console.log("Database connection failed");

    return schemas;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
