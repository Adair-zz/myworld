import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import stockMarketSlice from "./stockMarketSlice";
import stockSelectedSlice from "./stockSelectSlice";

const store = configureStore({
  reducer: {
    stockMarket: stockMarketSlice,
    stockSelect: stockSelectedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
