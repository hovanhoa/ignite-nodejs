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