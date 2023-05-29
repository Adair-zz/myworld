import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StockMarketType } from "../../utils/interface";

const initialState: StockMarketType[] = [
  {
    _id: "",
    market: "",
    company_name: "",
    stock_symbol: "",
    country: "",
    IPO_year: undefined,
    volume: undefined,
    sector: "",
    industry: "",
  },
];

export const fetchStockMarket = createAsyncThunk(
  "StockMarket/fetchStockMarket",
  async () => {
    const response = await axios.get("http://localhost:8080/stock-market");
    return response.data;
  }
);

const StockMarketSlice = createSlice({
  name: "StockMarket",
  initialState,
  reducers: {
    stockMarket: {
      reducer(
        state: StockMarketType[],
        action: PayloadAction<StockMarketType[]>
      ) {
        state.splice(0, state.length, ...action.payload);
      },
      prepare(stockMarket: StockMarketType[]) {
        return {
          payload: stockMarket,
        };
      },
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchStockMarket.fulfilled,
      (state: StockMarketType[], action: PayloadAction<StockMarketType[]>) => {
        state.splice(1, state.length, ...action.payload);
        // return action.payload;
      }
    );
  },
});

export default StockMarketSlice.reducer;
