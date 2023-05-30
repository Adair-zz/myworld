const mongoose = require("mongoose");
const credentials = require("../credentials");

const uri =
  "mongodb+srv://" +
  credentials.username +
  ":" +
  credentials.password +
  "@" +
  credentials.host +
  "/" +
  credentials.database.stock_market;

let stockMarketConnection = null;
let stockMarketModel = null;

const schema = mongoose.Schema;

const stockMarketSchema = new schema(
  {
    market: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    stock_symbol: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    IPO_year: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
  },
  {
    collection: "stock_market",
    versionKey: false,
  }
);

module.exports = {
  getStockMarketModel: () => {
    if (stockMarketConnection === null) {
      stockMarketConnection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      stockMarketModel = stockMarketConnection.model(
        "StockMarketModel",
        stockMarketSchema
      );
    }
    return stockMarketModel;
  },
};
