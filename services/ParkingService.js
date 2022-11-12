const ParkingModel = require("../models/ParkingModel");

module.exports = {
  getAll: async () => {
    return await ParkingModel.getAll()
  }
}