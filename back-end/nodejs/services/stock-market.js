const StockMarketDB = require("../database/stock-marketDB");
const StockMarket = StockMarketDB.getStockMarketModel();

const fetchStockMarket = async (req, res) => {
  try {
    const stockMarket = await StockMarket.find();
    res.status(200).json(stockMarket);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getCompanyNameInfo = async (req, res) => {
  try {
    const company_name = req.params.company_name;
    const stockInfo = await StockMarket.find({ company_name: company_name });
    res.status(200).json(stockInfo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getStockSymbolInfo = async (req, res) => {
  try {
    const stock_symbol = req.params.stock_symbol;
    console.log(stock_symbol);
    const stockInfo = await StockMarket.find({ stock_symbol: stock_symbol });
    res.status(200).json(stockInfo);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { fetchStockMarket, getCompanyNameInfo, getStockSymbolInfo };
