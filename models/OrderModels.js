const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
  times: {
    type: [Date],
    default: [() => new Date(), null, null, null, null]
  },
  customer: {
    type: { 
      name: String,
      phone: String,
      email: String
    },
    required: true,
  },
  paymentMethod: String,
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  price: {
    type: [Number],
    required: true
  },
  quantity: {
    type: [Number],
    required: true
  },
  parkingId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: true
  } 
});


const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;