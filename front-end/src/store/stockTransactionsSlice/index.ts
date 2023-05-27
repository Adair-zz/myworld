import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  stockTransactionsSlice,
  stockTransactionsType,
} from "../../utils/interface";
import axios from "axios";

const initialState: stockTransactionsSlice = {
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
      equity: undefined,
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
      equity: undefined,
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
        state: stockTransactionsSlice,
        action: PayloadAction<stockTransactionsType[]>
      ) {
        state.demo_transactions = action.payload;
      },
      prepare(demoTransactions: stockTransactionsType[]) {
        return {
          payload: demoTransactions,
        };
      },
    },
    liveTransactions: {
      reducer(
        state: stockTransactionsSlice,
        action: PayloadAction<stockTransactionsType[]>
      ) {
        state.live_transactions = action.payload;
      },
      prepare(liveTransactions: stockTransactionsType[]) {
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
        state: stockTransactionsSlice,
        action: PayloadAction<stockTransactionsType[]>
      ) => {
        const demoTransactions = action.payload;
        state.demo_transactions = demoTransactions;
      }
    );
  },
});

export default stockTransactions.reducer;
