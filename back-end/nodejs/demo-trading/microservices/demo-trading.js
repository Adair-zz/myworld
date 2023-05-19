const DemoTradingDB = require("../database/demo-tradingDB");
const DemoTrading = DemoTradingDB.getModel();

const demoOrder = async (req, res) => {
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
      brokerage_fee: brokerage_fee,
      equity: equity,
      date: date,
      time: time,
    });

    await newDemoOrder.save();
    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};

const demoTransaction = async (req, res) => {
  try {
    const demoTrades = await DemoTrading.find();

    if (demoTrades.length === 0) {
      res.status(200).json({ data: null });
    } else {
      res.status(200).json(demoTrades);
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};

module.exports = {
  demoOrder,
  demoTransaction,
};
