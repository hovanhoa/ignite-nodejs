const express = require("express");
var mongoose = require('mongoose');
const ParkingService = require("../services/ParkingService.js");
const OrderService = require('../services/OrderService');
const ParkingModel = require("../models/ParkingModel.js");
const router = express.Router();

const IgniteClient = require('apache-ignite-client');
var conn = require("../Conn.js")
const COUNTRY_CACHE_NAME = 'Country';

const cors = require("cors")
router.use(cors())

router.post("/add-parking", async function (req, res) {
    console.log('POST add new parking');
    try {
        const parking = await ParkingService.createParking(req.body);
        res.status(201).send(parking);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/addfeedback", async function (req, res) {
    console.log('POST add new feedback');
    const parking = await ParkingService.addFeedback(req.body);
    try {
        
        await parking.save();
        res.status(201).send(parking.feedback);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/parking-management/:user", async function (req, res) {
    console.log('GET all parking by user');
    try {
        const listParking = await ParkingService.getAllParkingBy(req.params.user);
        let uncheck = []
        for (let ele of listParking) {
            uncheck.push((await OrderService.getNumOfUncheckOrderBy(ele._id)).toString());
        }
        res.status(200).send([listParking, uncheck]);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/parking-searching", async function (req, res) {
    console.log('GET all parking');
    try {
        const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
        const countryCache = conn.getCache(COUNTRY_CACHE_NAME);
        const query = new SqlFieldsQuery(
            'SELECT name, population FROM City ORDER BY population DESC LIMIT 10');
        const cursor = await countryCache.query(query);

        var result = []
        do {
            let row = await cursor.getValue();
            result.push({'name': row[0], 'population': row[1]});
        } while (cursor.hasMore());
        res.status(200).send(result);

        // const listParking = await ParkingService.getAllParking();
        // res.status(200).send(listParking);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:parkingId", async function (req, res) {
    console.log("GET parking");
    try {
        const parking = await ParkingService.getParking(req.params.parkingId);
        res.status(200).send(parking);
    }
    catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;