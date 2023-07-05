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
  credentials.database.demo_trading;

let demoTransactionsConnection = null;
let demoTransactionsModel = null;

const Schema = mongoose.Schema;

const demoTransactionsSchema = new Schema(
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
    total_amount: {
      type: Number,
      required: true,
    },
    tp_price: {
      type: Number,
      required: true,
    },
    sl_price: {
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
    image: {
      data: { type: Buffer },
      contentType: { type: String },
    },
    notes: {
      type: String,
    },
  },
  {
    collection: "demo_transactions",
    versionKey: false,
  }
);

let demoHoldingsConnection = null;
let demoHoldingsModel = null;

const demoHoldingsSchema = new Schema(
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
    avg_cost_price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total_cost_price: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
    },
    latest_closing_price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "demo_holdings",
    versionKey: false,
  }
);

let transactioNotesConnection = null;
let transactionNotesModel = null;

const transactionNotesSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    image: {
      data: { type: Buffer, required: true },
      contentType: { type: String, required: true },
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    collection: "transaction-notes",
    versionKey: false,
  }
);

module.exports = {
  getDemoTransactionsModel: () => {
    if (demoTransactionsConnection === null) {
      demoTransactionsConnection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      demoTransactionsModel = demoTransactionsConnection.model(
        "DemoTradingModel",
        demoTransactionsSchema
      );
    }
    return demoTransactionsModel;
  },
  getDemoHoldingsModel: () => {
    if (demoHoldingsConnection === null) {
      demoHoldingsConnection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      demoHoldingsModel = demoHoldingsConnection.model(
        "DemoTradingModel",
        demoHoldingsSchema
      );
    }
    return demoHoldingsModel;
  },
  getTransactionNotesModel: () => {
    if (transactioNotesConnection == null) {
      transactioNotesConnection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      transactionNotesModel = transactioNotesConnection.model(
        "TransactionNotesModel",
        transactionNotesSchema
      );
    }
    return transactionNotesModel;
  },
};
