import axios, { AxiosResponse } from "axios";

export const placeBuyOrder = async (buyOrderInfo: {
  market: string;
  company_name: string;
  stock_symbol: string;
  transaction_type: "buy";
  stock_value: number;
  quantity: number;
  brokerage_fee: number;
  total_amount: number;
  tp_price: number;
  sl_price: number;
  date: string;
  time: string;
}): Promise<AxiosResponse<any>> => {
  return axios.post<any, AxiosResponse<any>>(
    "http://localhost:8080/placeDemoBuyOrder",
    buyOrderInfo
  );
};

export const addTransactionNotes = async (notesInfo: {
  _id: string;
  image: File | null;
  notes: string;
}): Promise<AxiosResponse<any>> => {
  console.log("image success!");
  return axios.post<any, AxiosResponse<any>>(
    "http://localhost:8080/submitTransactionNotes",
    notesInfo
  );
};
