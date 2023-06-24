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
        const { transaction_type, market, company_name, stock_symbol } =
          action.payload;
        state.transaction_type = transaction_type;
        state.market = market;
        state.company_name = company_name;
        state.stock_symbol = stock_symbol;
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
    setStockValue: {
      reducer(
        state: StockTransactionsBaseType,
        action: PayloadAction<number | undefined>
      ) {
        state.stock_value = action.payload;
      },
      prepare(stockValue: number | undefined) {
        return {
          payload: stockValue,
        };
      },
    },
    setQuantity: {
      reducer(
        state: StockTransactionsBaseType,
        action: PayloadAction<number | undefined>
      ) {
        state.quantity = action.payload;
      },
      prepare(quantity: number | undefined) {
        return {
          payload: quantity,
        };
      },
    },
    setTotalAmount: {
      reducer(
        state: StockTransactionsBaseType,
        action: PayloadAction<number | undefined>
      ) {
        state.total_amount = action.payload;
      },
      prepare(total_amount: number | undefined) {
        return {
          payload: total_amount,
        };
      },
    },
    setTpPrice: {
      reducer(
        state: StockTransactionsBaseType,
        action: PayloadAction<number | undefined>
      ) {
        state.tp_price = action.payload;
      },
      prepare(tpPrice: number | undefined) {
        return {
          payload: tpPrice,
        };
      },
    },
    setSlPrice: {
      reducer(
        state: StockTransactionsBaseType,
        action: PayloadAction<number | undefined>
      ) {
        state.sl_price = action.payload;
      },
      prepare(slPrice: number | undefined) {
        return {
          payload: slPrice,
        };
      },
    },
    resetSelectedStock: (state: StockTransactionsBaseType) => {
      state.stock_value = undefined;
      state.quantity = undefined;
      state.brokerage_fee = undefined;
      state.total_amount = undefined;
      state.tp_price = undefined;
      state.sl_price = undefined;
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

export const {
  stockSelect,
  statusChange,
  setStockValue,
  setQuantity,
  setTotalAmount,
  setTpPrice,
  setSlPrice,
} = stockSelectSlice.actions;
export default stockSelectSlice.reducer;
