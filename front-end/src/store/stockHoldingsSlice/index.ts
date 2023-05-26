import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StockHoldingsSlice, StockHoldingsType } from "../../utils/interface";

const initialState: StockHoldingsSlice = {
  demo_holdings: {
    _id: "",
    market: "",
    company_name: "",
    stock_symbol: "",
    avg_cost_price: undefined,
    quantity: undefined,
    total_cost_price: undefined,
    equity: undefined,
    latest_closing_price: undefined,
  },
  live_holdings: {
    _id: "",
    market: "",
    company_name: "",
    stock_symbol: "",
    avg_cost_price: undefined,
    quantity: undefined,
    total_cost_price: undefined,
    equity: undefined,
    latest_closing_price: undefined,
  },
};

const stockHoldings = createSlice({
  name: "StockHoldings",
  initialState,
  reducers: {
    demoHoldings: {
      reducer(
        state: StockHoldingsSlice,
        action: PayloadAction<StockHoldingsType>
      ) {
        state.demo_holdings = action.payload;
      },
      prepare(demoHoldings: StockHoldingsType) {
        return {
          payload: demoHoldings,
        };
      },
    },
    liveHoldings: {
      reducer(
        state: StockHoldingsSlice,
        action: PayloadAction<StockHoldingsType>
      ) {
        state.live_holdings = action.payload;
      },
      prepare(liveHoldings: StockHoldingsType) {
        return {
          payload: liveHoldings,
        };
      },
    },
  },
});

export default stockHoldings.reducer;
