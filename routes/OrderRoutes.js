const express = require("express");
const mongoose = require('mongoose');
const OrderModel = require("../models/OrderModels.js");
const ParkingModel = require("../models/ParkingModel.js");
const UserModel = require("../models/UserModel.js");
const OrderService = require("../services/OrderService.js");

const router = express.Router();

router.post('/add-order', async function(req, res){
   console.log('POST add new order');
    try {
      const order = await OrderService.createOrder(req.body);
      if(order) {
        res.send(order);
      }
      else {
        res.status(406).send(`Parking Id ${req.body.parkingId} not exist`);
      }
    } catch (error) {
      res.status(500).send(error);
    }
});



router.post('/addOrder', async function (req, res) {
  console.log('POST add new order');
  const order = new OrderModel(req.body);

  try {
    await order.save();
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});




router.post("/add-user", async function (req, res) {
  console.log('POST add new user');
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.get("/order-management/:userName", async function (req, res) {
  console.log('GET all orders from all my parkings');
  try {
    const orders = await OrderService.getAllOrderBy(req.params.userName);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.put("/change-state/:id", async function (req, res) {
  console.log('PUT data for '+req.params.id);
  try {
    const lastestOrder = await OrderService.updStatusOrderBy(mongoose.Types.ObjectId(req.params.id), req.body);
    res.status(200).send(lastestOrder);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.get("/order-history/:userName", async function (req, res) {
  console.log("Get all my order history");
  try {
    const orders = await OrderService.getOrderHistory(req.params.userName);
    res.status(200).send(orders);
  }
  catch (error) {
    res.status(500).send(error);
  }
})

router.get("/:orderId", async function(req, res) {
  console.log("GET order from orderId");
  console.log(req.params.orderId);
  
  try {
    const order = await OrderService.getOrder(req.params.orderId);
    res.status(200).send(order);
  }
  catch(error) {
    res.status(500).send(error);
  }

});

module.exports = router;