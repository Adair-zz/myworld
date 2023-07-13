const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const fileUpload = require("./middleware/file-upload");
const demoTrading = require("./services/demo-trading");
const stockMarket = require("./services/stock-market");
const demoTradingDB = require("./database/demo-tradingDB");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/demo-holdings", demoTrading.demoHoldings);
app.post("/placeDemoBuyOrder", demoTrading.placeBuyOrder);
app.post(
  "/transaction-notes",
  fileUpload.single("image"),
  demoTrading.addTransactionNotes
);
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
