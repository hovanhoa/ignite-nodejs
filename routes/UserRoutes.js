const express = require("express");
const UserModel = require("../models/UserModel.js");
const UserService = require("../services/UserService.js");

const router = express.Router();

router.post("/add-user", async function (req, res) {
    console.log('POST add new user');
    try {
        const user = await UserService.createUser(req.body);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/authenticate", async function (req, res) {
    console.log('GET authenticate user');
    try {
        const isValid = await UserService.authenticate(req.body.userName, req.body.password);
        if(isValid) {
            res.status(200).send();
        }
        else {
            res.status(401).send("Wrong username or password");
        }
    }
    catch(error) {
        res.status(500).send(error);
    }
});

router.get("/info/:userName", async function(req, res) {
    console.log("GET user info");
    try {
        const userInfo = await UserService.getUserInfo(req.params.userName);
        res.status(200).send(userInfo);
    }
    catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;