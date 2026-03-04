const express = require("express");
const cors = require("cors");
require("dotenv").config();
const reportroutes = require("./routes/report.routes");
const dashboardroutes = require("./routes/dashboard.routes");
const ConnectDB = require("./config/db");
const startConsumer = require("./kafka_bus/consumer");
const app = express();

ConnectDB();
startConsumer();


app.use(cors());
app.use(express.json());


app.use("/reports", reportroutes);
app.use('/dashboard',dashboardroutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port :${process.env.PORT}`);
});