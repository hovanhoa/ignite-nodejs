const UserModel = require("../models/UserModel.js");

module.exports = {
  createUser: async (user) => {
    const userModel = new UserModel(user);
    const newUser = await userModel.save();
    return newUser;
  },

  authenticate: async (userName, password) => {
    const userExist = await UserModel.exists({ $and: [{userName: userName}, {password: password}]});
    console.log(userExist)
    return userExist;
  },

  getUserInfo: async(userName) => {
    const userInfo = await UserModel.findOne({userName: userName});
    return userInfo;
  }
}