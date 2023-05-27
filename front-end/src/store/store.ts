import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import stockSelectedSlice from "./stockSelectSlice";
import stockHoldingsSlice from "./stockHoldingsSlice";
import stockTransactionsSlice from "./stockTransactionsSlice";

const store = configureStore({
  reducer: {
    stockSelect: stockSelectedSlice,
    stockHoldings: stockHoldingsSlice,
    stockTransactions: stockTransactionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
