import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import stockMarketSlice from "./stockMarketSlice";
import stockHoldingsSlice from "./stockHoldingsSlice";
import stockTransactionsSlice from "./stockTransactionsSlice";
import stockSelectedSlice from "./stockSelectSlice";

const store = configureStore({
  reducer: {
    stockMarket: stockMarketSlice,
    stockHoldings: stockHoldingsSlice,
    stockTransactions: stockTransactionsSlice,
    stockSelect: stockSelectedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
