const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  email: String,
  secret: String,
});

module.exports = mongoose.model("Secret", secretSchema);
