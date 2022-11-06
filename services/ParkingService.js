const ParkingModel = require("../models/ParkingModel.js");
var mongoose = require('mongoose');
module.exports = {
  createParking: async (parking) => {
    const parkingModel = new ParkingModel(parking);
    console.log(parkingModel);
    const newParking= await parkingModel.save();
    return newParking;
  },
  getAllParking: async () => {
    return await ParkingModel.find();
  },

  getAllParkingBy: async (username) => {
    let data = await ParkingModel.find({userName:username});
    return data;
  },

  addFeedback: async (each) => {
    
     
    let data = await ParkingModel.find({_id: new mongoose.Types.ObjectId(each[1])});
    data[0].feedback.push(each[0]);
    await data[0].save();
    console.log(data[0])
    return data;
   
 },

  getParking: async (parkingId) => {
    console.log(parkingId);
    const parking = await ParkingModel.findOne({_id: parkingId});
    console.log(parking);
    return parking;
  }
}