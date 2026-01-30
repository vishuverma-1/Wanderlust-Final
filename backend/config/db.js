const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vermavishu9999_db_user:vishuverma@cluster0.f2u2u0m.mongodb.net/?appName=Cluster0"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;