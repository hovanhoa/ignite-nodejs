const express = require('express');
const orderRouter = require('./routes/OrderRoutes');
const userRouter = require("./routes/UserRoutes");
const parkingRouter = require("./routes/ParkingRoutes");
const paymentRouter = require("./routes/PaymentRoutes");
const cors = require('cors');
const path = require('path');
const app = express()
const port = process.env.PORT || 8000

app.use(express.json());
app.use(cors());

var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://mhung:123@cluster0.7hgnc.mongodb.net/Easy_Parking';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use('/order', orderRouter);
app.use("/user", userRouter);
app.use("/parking", parkingRouter);
app.use("/payment", paymentRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;