import axios, { AxiosResponse } from "axios";

// market: string;
// company_name: string;
// stock_symbol: string;
// transaction_type: "buy";
// stock_value: number;
// quantity: number;
// brokerage_fee: number;
// total_amount: number;
// tp_price: number;
// sl_price: number;
// date: string;
// time: string;
export const placeBuyOrder = async (buyOrderInfo: {
  [key: string]: any;
}): Promise<AxiosResponse<any>> => {
  return axios.post<any, AxiosResponse<any>>(
    "http://localhost:8080/placeDemoBuyOrder",
    buyOrderInfo
  );
};

// _id: string;
// image: File | null;
// notes: string;
export const addTransactionNotes = async (notesInfo: {
  [key: string]: any;
}): Promise<AxiosResponse<any>> => {
  console.log("image success!");
  return axios.post<any, AxiosResponse<any>>(
    "http://localhost:8080/transaction-notes",
    notesInfo
  );
};
