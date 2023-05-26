const DemoTradingDB = require("../database/demo-tradingDB");
const DemoTrading = DemoTradingDB.getDemoTransactionsModel();
const DemoHoldings = DemoTradingDB.getDemoHoldingsModel();

const demoHoldings = async (req, res) => {
  try {
    const demoHoldings = await DemoHoldings.find();
    res.status(200).json(demoHoldings);
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};

const demoOrders = async (req, res) => {
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
    res.status(201);
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};

const demoTransactions = async (req, res) => {
  try {
    const demoTrades = await DemoTrading.find();
    res.status(200).json(demoTrades);
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};

module.exports = {
  demoHoldings,
  demoOrders,
  demoTransactions,
};
