const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const demoTrading = require("./microservices/demo-trading");
const stockMarket = require("./microservices/stock-market");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/demo-holdings", demoTrading.demoHoldings);
app.post("/demo-orders", demoTrading.demoOrders);
app.get("/demo-transactions", demoTrading.demoTransactions);
app.get("/stock-market", stockMarket.fetchStockMarket);
app.get(
  "/stock-market/company-name/:company_name",
  stockMarket.getCompanyNameInfo
);
app.get(
  "/stock-market/stock-symbol/:stock_symbol",
  stockMarket.getStockSymbolInfo
);

app.listen(8080, () => {
  console.log("Listening on 8080");
});
