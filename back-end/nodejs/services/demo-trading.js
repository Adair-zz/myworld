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

    const pipeline = [
      {
        $set: {
          total_cost_price: {
            $add: ["$total_cost_price", req.body.total_amount],
          },
          quantity: { $add: ["$quantity", req.body.quantity] },
        },
      },
      {
        $set: {
          avg_cost_price: {
            $cond: {
              if: { $eq: ["$quantity", 100] },
              then: 0,
              else: {
                $divide: ["$total_cost_price", "$quantity"],
              },
            },
          },
        },
      },
    ];

    await DemoHoldings.findOne({
      stock_symbol: req.body.stock_symbol,
    }).then(async (demo) => {
      if (demo === null) {
        const newDemoHolding = new DemoHoldings({
          market: req.body.market,
          company_name: req.body.company_name,
          stock_symbol: req.body.stock_symbol,
          quantity: req.body.quantity,
          total_cost_price: req.body.total_amount,
          avg_cost_price: req.body.total_amount / req.body.quantity,
          equity: 0,
          latest_closing_price: 0,
        });
        await newDemoHolding.save();
      } else {
        await DemoHoldings.updateOne(
          { stock_symbol: req.body.stock_symbol },
          pipeline
        );
      }
    });

    res.status(201).json({ msg: "Place Buy Order Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const placeSellOrder = async (req, res) => {
  try {
    await DemoHoldings.findOne({
      stock_symbol: req.body.stock_symbol,
    }).then(async (demo) => {
      if (demo === null) {
        res.status(400).json({ msg: "You don't have this stock" });
      } else if (demo.quantity < req.body.quantity) {
        res.status(400).json({ msg: "You don't have enough to sell" });
      } else {
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

        const newTotalCostPrice = demo.total_cost_price - req.body.total_amount;
        const newQuantity = demo.quantity - req.body.quantity;
        const newAvgCostPrice =
          newQuantity === 0 ? 0 : newTotalCostPrice / newQuantity;

        if (newQuantity === 0) {
          await DemoHoldings.deleteOne({ stock_symbol: req.body.stock_symbol });
        } else {
          await DemoHoldings.updateOne(
            { stock_symbol: req.body.stock_symbol },
            {
              $set: {
                total_cost_price: newTotalCostPrice,
                quantity: newQuantity,
                avg_cost_price: newAvgCostPrice,
              },
            }
          );
        }

        res.status(201).json({ msg: "place Sell Order Successfully" });
      }
    });
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

const getTransactionNotesById = async (req, res) => {
  try {
    const notes = await TransactionNotes.find({ _id: req.params._id });
    const imageData = notes[0];
    const bufferData = imageData.image.data;
    if (bufferData) {
      console.log(1);
      const buffer = Buffer.from(bufferData);
      fs.writeFileSync("hello.png", buffer);
    }
    if (notes.length != 0) {
      res.status(200).json(notes);
    } else {
      res.status(404).json({ msg: "Transaction notes are not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  demoHoldings,
  demoTransactions,
  placeBuyOrder,
  placeSellOrder,
  addTransactionNotes,
  getTransactionNotesById,
};
