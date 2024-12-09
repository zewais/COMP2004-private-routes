const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // unique index and unique constraint to the email field
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
