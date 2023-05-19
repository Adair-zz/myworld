const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const DemoTradingDB = require("./demo-tradingDB");
const DemoTrading = DemoTradingDB.getModel();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/demo-order", async (req, res) => {
  try {
    const {
      market,
      company_name,
      stock_symbol,
      transaction_type,
      stock_value,
      quantity,
      brokerage_fee,
      equity,
      date,
      time,
    } = req.body;

    const newDemoOrder = new DemoTrading({
      market: market,
      company_name: company_name,
      stock_symbol: stock_symbol,
      transaction_type: transaction_type,
      stock_value: stock_value,
      quantity: quantity,
      brokerage_fees: brokerage_fee,
      total_amount: equity,
      date: date,
      time: time,
    });

    await newDemoOrder.save();
    res.status(201).send("Success");
  } catch (error) {
    res.status(500).send("Failed to save demo order." + error);
  }
});

app.get("/demo-transaction", async (req, res) => {
  try {
    const demoTrades = await DemoTrading.find();

    if (demoTrades.length === 0) {
      res.status(200).json({ msg: "No demo trades found" });
    } else {
      res.status(200).json(demoTrades);
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch demo trades. Internal server error" + error,
    });
  }
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
