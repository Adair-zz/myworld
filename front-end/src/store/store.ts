import { configureStore } from "@reduxjs/toolkit";
import stockSelectedSlice from "./order/stockSelectSlice";
// import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    stockSelect: stockSelectedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
