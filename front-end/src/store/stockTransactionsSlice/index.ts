import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  StockTransactionsSlice,
  StockTransactionsType,
} from "../../utils/interface";

const initialState: StockTransactionsSlice = {
  demo_transactions: [
    {
      _id: "",
      market: "",
      company_name: "",
      stock_symbol: "",
      transaction_type: "",
      stock_value: undefined,
      quantity: undefined,
      brokerage_fee: undefined,
      total_amount: undefined,
      tp_price: undefined,
      sl_price: undefined,
      date: "",
      time: "",
    },
  ],
  live_transactions: [
    {
      _id: "",
      market: "",
      company_name: "",
      stock_symbol: "",
      transaction_type: "",
      stock_value: undefined,
      quantity: undefined,
      brokerage_fee: undefined,
      total_amount: undefined,
      tp_price: undefined,
      sl_price: undefined,
      date: "",
      time: "",
    },
  ],
};

export const fetchDemoTransactions = createAsyncThunk(
  "StockTransactions/fetchDemoTransactions",
  async () => {
    const response = await axios.get("http://localhost:8080/demo-transactions");
    return response.data;
  }
);

const stockTransactions = createSlice({
  name: "StockTransactions",
  initialState,
  reducers: {
    demoTransactions: {
      reducer(
        state: StockTransactionsSlice,
        action: PayloadAction<StockTransactionsType[]>
      ) {
        state.demo_transactions = action.payload;
      },
      prepare(demoTransactions: StockTransactionsType[]) {
        return {
          payload: demoTransactions,
        };
      },
    },
    liveTransactions: {
      reducer(
        state: StockTransactionsSlice,
        action: PayloadAction<StockTransactionsType[]>
      ) {
        state.live_transactions = action.payload;
      },
      prepare(liveTransactions: StockTransactionsType[]) {
        return {
          payload: liveTransactions,
        };
      },
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchDemoTransactions.fulfilled,
      (
        state: StockTransactionsSlice,
        action: PayloadAction<StockTransactionsType[]>
      ) => {
        state.demo_transactions = action.payload;
      }
    );
  },
});

export default stockTransactions.reducer;
