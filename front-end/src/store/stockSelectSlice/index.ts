import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  SelectedStockBaseType,
  StockTransactionsBaseType,
} from "../../utils/interface";
import axios from "axios";

export const getCompanyNameInfo = createAsyncThunk(
  "StockSelect/getCompanyNameInfo",
  async (company_name: string) => {
    const response = await axios.get(
      `http://localhost:8080/stock-market/company-name/${company_name}`
    );
    return response.data;
  }
);

export const getStockSymbolInfo = createAsyncThunk(
  "StockSelect/getStockSymbolInfo",
  async (stock_symbol: string) => {
    const response = await axios.get(
      `http://localhost:8080/stock-market/stock-symbol/${stock_symbol}`
    );
    return response.data;
  }
);

export const submitBuyTicket = createAsyncThunk(
  "StockSelect/submitBuyTicket",
  async (data: StockTransactionsBaseType) => {
    await axios.post("http://localhost:8080/demo-orders", data);
  }
);

const initialState: StockTransactionsBaseType = {
  transaction_type: "buy",
  market: "",
  company_name: "",
  stock_symbol: "",
  stock_value: undefined,
  quantity: undefined,
  brokerage_fee: 5,
  total_amount: undefined,
  tp_price: undefined,
  sl_price: undefined,
  date: "",
  time: "",
};

const stockSelectSlice = createSlice({
  name: "StockSelect",
  initialState,
  reducers: {
    stockSelect: {
      reducer(
        state: StockTransactionsBaseType,
        action: PayloadAction<SelectedStockBaseType>
      ) {
        state.transaction_type = action.payload.transaction_type;
        state.market = action.payload.market;
        state.company_name = action.payload.company_name;
        state.stock_symbol = action.payload.stock_symbol;
      },
      prepare(selectedStock: SelectedStockBaseType) {
        return {
          payload: selectedStock,
        };
      },
    },
    statusChange: {
      reducer(state: StockTransactionsBaseType, action: PayloadAction<string>) {
        state.transaction_type = action.payload;
      },
      prepare(transaction_type: string) {
        return {
          payload: transaction_type,
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getCompanyNameInfo.fulfilled,
        (
          state: StockTransactionsBaseType,
          action: PayloadAction<StockTransactionsBaseType[]>
        ) => {
          const data = action.payload;
          state.market = data[0].market;
          state.company_name = data[0].company_name;
          state.stock_symbol = data[0].stock_symbol;
          return state;
        }
      )
      .addCase(
        getStockSymbolInfo.fulfilled,
        (
          state: StockTransactionsBaseType,
          action: PayloadAction<StockTransactionsBaseType[]>
        ) => {
          const data = action.payload;
          state.market = data[0].market;
          state.company_name = data[0].company_name;
          state.stock_symbol = data[0].stock_symbol;
          return state;
        }
      );
    builder.addCase(submitBuyTicket.fulfilled, () => {
      console.log("Order Successfully!");
    });
  },
});

export const { stockSelect, statusChange } = stockSelectSlice.actions;
export default stockSelectSlice.reducer;
