const StockMarketDB = require("../database/stock-marketDB");
const StockMarket = StockMarketDB.getStockMarketModel();

const fetchStockMarket = async (req, res) => {
  try {
    const stockMarket = await StockMarket.find();
    res.status(200).json(stockMarket);
  } catch (error) {
    res.status(500).json({ status: 500, error: error });
  }
};

module.exports = { fetchStockMarket };
