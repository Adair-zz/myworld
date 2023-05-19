const mongoose = require("mongoose");

const credentials = require("./credentials");

const uri =
  "mongodb+srv://" +
  credentials.username +
  ":" +
  credentials.password +
  "@" +
  credentials.host +
  "/" +
  credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

let demoTradingSchema = new Schema(
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
    transaction_type: {
      type: String,
      required: true,
    },
    stock_value: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    brokerage_fee: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    collection: "demo_trading",
    versionKey: false,
  }
);

module.exports = {
  getModel: () => {
    if (connection === null) {
      connection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      model = connection.model("DemoTradingModel", demoTradingSchema);
    }
    return model;
  },
};
