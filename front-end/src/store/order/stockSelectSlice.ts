import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedStockType } from "../../utils/interface";

const initialState: SelectedStockType = {
  status: "buy",
  market: "",
  company_name: "",
  stock_symbol: "",
};

const stockSelectSlice = createSlice({
  name: "selectedStock",
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
});

export const { stockSelect, statusChange } = stockSelectSlice.actions;
export default stockSelectSlice.reducer;
