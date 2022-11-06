const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    require: true
  },

  password: {
    type: String,
    required: true
  },

  displayName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;