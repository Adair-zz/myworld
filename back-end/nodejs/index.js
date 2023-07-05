const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
var upload = multer({ dest: "uploads/" });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

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
  "/submitTransactionNotes",
  upload.single("image"),
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
