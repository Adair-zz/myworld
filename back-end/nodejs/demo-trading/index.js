const express = require("express");
const bodyParser = require("body-parser");
const DemoTradingDB = require("./demo-tradingDB");
const DemoTrading = DemoTradingDB.getModel();

const app = express();
app.use(bodyParser.json());

app.post("/demo-order", async (req, res) => {
  try {
    const newDemoOrder = new DemoTrading({
      stock_symbol: req.body.stock_symbol,
      transaction_type: req.body.transaction_type,
      price: req.body.price,
      quantity: req.body.quantity,
      brokerage_fees: req.body.brokerage_fees,
      total_amount: req.body.total_amount,
      date: req.body.date,
      time: req.body.time,
      market: req.body.market,
    });

    await newDemoOrder.save();
    res.status(201).send("Success");
  } catch (error) {
    res.status(500).send("Failed to save demo order." + error);
  }
});

app.get("/demo-trades", async (req, res) => {
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
