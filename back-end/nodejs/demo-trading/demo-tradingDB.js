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
    stock_symbol: {
      type: String,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    brokerage_fees: {
      type: Number,
      required: true,
    },
    total_amount: {
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
    market: {
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
