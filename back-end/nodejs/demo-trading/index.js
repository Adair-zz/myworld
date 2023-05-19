const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const demoTrading = require("./microservices/demo-trading");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/demo-order", demoTrading.demoOrder);
app.get("/demo-transaction", demoTrading.demoTransaction);

app.listen(8080, () => {
  console.log("Listening on 8080");
});
