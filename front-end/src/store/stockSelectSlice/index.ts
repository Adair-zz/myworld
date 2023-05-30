import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SelectedStockType } from "../../utils/interface";
import axios from "axios";

export const getCompanyNameInfo = createAsyncThunk(
  "StockSelect/getCompanyNameInfo",
  async (company_name: string) => {
    const response = await axios.get(
      `http://localhost:8080/stock-market/company-name/${company_name}`
    );
    console.log(response.data);
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

const initialState: SelectedStockType = {
  status: "buy",
  market: "",
  company_name: "",
  stock_symbol: "",
};

const stockSelectSlice = createSlice({
  name: "StockSelect",
  initialState,
  reducers: {
    stockSelect: {
      reducer(
        state: SelectedStockType,
        action: PayloadAction<SelectedStockType>
      ) {
        const { status, market, company_name, stock_symbol } = action.payload;
        state.status = status;
        state.market = market;
        state.company_name = company_name;
        state.stock_symbol = stock_symbol;
      },
      prepare(selectedStock: SelectedStockType) {
        return {
          payload: selectedStock,
        };
      },
    },
    statusChange: {
      reducer(state: SelectedStockType, action: PayloadAction<string>) {
        state.status = action.payload;
      },
      prepare(status: string) {
        return {
          payload: status,
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getCompanyNameInfo.fulfilled,
        (
          state: SelectedStockType,
          action: PayloadAction<SelectedStockType[]>
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
          state: SelectedStockType,
          action: PayloadAction<SelectedStockType[]>
        ) => {
          const data = action.payload;
          state.market = data[0].market;
          state.company_name = data[0].company_name;
          state.stock_symbol = data[0].stock_symbol;
          return state;
        }
      );
  },
});

export const { stockSelect, statusChange } = stockSelectSlice.actions;
export default stockSelectSlice.reducer;
