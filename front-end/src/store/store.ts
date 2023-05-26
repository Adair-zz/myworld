import { configureStore } from "@reduxjs/toolkit";
import stockSelectedSlice from "./stockSelectSlice";
import stockHoldingsSlice from "./stockHoldingsSlice";
// import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    stockSelect: stockSelectedSlice,
    stockHoldings: stockHoldingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
