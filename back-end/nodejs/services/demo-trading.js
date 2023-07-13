const mongoose = require("mongoose");
const fs = require("fs");
const DemoTradingDB = require("../database/demo-tradingDB");
const DemoTrading = DemoTradingDB.getDemoTransactionsModel();
const DemoHoldings = DemoTradingDB.getDemoHoldingsModel();
const TransactionNotes = DemoTradingDB.getTransactionNotesModel();

const demoHoldings = async (req, res) => {
  try {
    const demoHoldings = await DemoHoldings.find();
    res.status(200).json(demoHoldings);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const placeBuyOrder = async (req, res) => {
  try {
    const newDemoOrder = new DemoTrading({
      market: req.body.market,
      company_name: req.body.company_name,
      stock_symbol: req.body.stock_symbol,
      transaction_type: req.body.transaction_type,
      stock_value: req.body.stock_value,
      quantity: req.body.quantity,
      brokerage_fee: req.body.brokerage_fee,
      total_amount: req.body.total_amount,
      tp_price: req.body.tp_price,
      sl_price: req.body.sl_price,
      date: req.body.date,
      time: req.body.time,
    });

    await newDemoOrder.save();
    res.status(201).json({ msg: "Place Buy Order Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const addTransactionNotes = async (req, res) => {
  try {
    const newTransactionNotes = new TransactionNotes({
      _id: new mongoose.Types.ObjectId(req.body._id),
      notes: req.body.notes,
      image: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      },
    });
    await newTransactionNotes.save();
    res.status(201).json({ msg: "Add Transaction Notes Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const demoTransactions = async (req, res) => {
  try {
    const demoTrades = await DemoTrading.find().select(
      "market company_name stock_symbol transaction_type stock_value quantity brokerage_fee total_amount tp_price sl_price date time"
    );
    res.status(200).json(demoTrades);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  demoHoldings,
  placeBuyOrder,
  addTransactionNotes,
  demoTransactions,
};
