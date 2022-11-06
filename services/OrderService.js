const OrderModel = require("../models/OrderModels.js");
const ParkingModel = require("../models/ParkingModel.js")
const ParkingService = require('./ParkingService');

const VEHICLE_NAMES = ["Xe máy", "Xe ô tô 4-7 chỗ", "Xe 16 chỗ", "Xe 32 chỗ"];

async function formatOrder(order) {

    order = order.toObject();

    const parking = await ParkingModel.findOne({_id: order.parkingId});
    order.parking = {};
    order.parking.name = parking.name;
    order.parking.address = [parking.street, parking.ward, parking.district, parking.province].join(", ");
    order.parking.image = parking.img[0];
    order.vehicles = VEHICLE_NAMES.map((item ,idx) => {
        var vehicle = {};
        vehicle.name = item;
        vehicle.unitPrice = order.price[idx];
        vehicle.quantity = order.quantity[idx];
        return vehicle;
    })
    console.log(order);
    delete order.parkingId;
    return order;
    

};

module.exports = {
    getNumOfUncheckOrderBy: async (parkingId) => {
        return await OrderModel
            .count(
                {
                    parkingId: parkingId,
                    "times.0": {
                        $ne:null
                    },
                    "times.1": {
                        $eq:null
                    }
                });
    },

    getAllOrderBy: async function(userName){
        let parks = await ParkingService.getAllParkingBy(userName);
        let orders = [];
        for(let park of parks){
            let orderOfPark = await OrderModel.find({parkingId:park?._id});
            orders.push(orderOfPark);
        }

        let zip = parks.map((park, index)=>[park.name,orders[index]]);
        zip = zip.filter(item => item[1]?.length!==0);
        return zip;
    },

    updStatusOrderBy: async function (id, newStatus) {
        let doc = await OrderModel.findOneAndUpdate({_id:id}, {times:newStatus}, {new:true});
        return doc;
    },

    createOrder: async (body) => {
        var order = body;
        const parking = await ParkingModel.findOne({_id: order.parkingId});
        if(Object.keys(parking).length !== 0) {
            order.price = parking.price;
            const orderModel = new OrderModel(order);
            const newOrder = await orderModel.save();
            return newOrder;
        }
        else {
            return null;
        }

    },

    getOrder: async (orderId) => {
        var order = await OrderModel.findOne({_id: orderId});
 
        return await formatOrder(order);
    },

    getOrderHistory: async (userName) => {
        var orders = await OrderModel.find({userName: userName});
        var formatedOrders = [];
        for(let i = 0; i < orders.length; i++) {
            try {
                formatedOrders.push(await formatOrder(orders[i]));

            }
            catch(error) {
                console.log(error);
            }
        }
        return formatedOrders;
    }
}