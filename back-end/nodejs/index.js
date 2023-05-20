const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const demoTrading = require("./microservices/demo-trading");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/demo-holdings", demoTrading.demoHoldings);
app.post("/demo-orders", demoTrading.demoOrders);
app.get("/demo-transactions", demoTrading.demoTransactions);

app.listen(8080, () => {
  console.log("Listening on 8080");
});
