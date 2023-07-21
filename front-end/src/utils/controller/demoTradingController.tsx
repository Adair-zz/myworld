import axios, { AxiosResponse } from "axios";

export const fetchDemoTransactions = async () => {
  return await axios.get("http://localhost:8080/demo-transactions");
};

export const fetchDemoHoldings = async () => {
  return await axios.get("http://localhost:8080/demo-holdings");
};

export const placeBuyOrder = async (buyOrderInfo: {
  [key: string]: any;
}): Promise<AxiosResponse<any>> => {
  return axios.post<any, AxiosResponse<any>>(
    "http://localhost:8080/placeDemoBuyOrder",
    buyOrderInfo
  );
};

export const placeSellOrder = async (sellOrderInfo: {
  market: string;
  company_name: string;
  stock_symbol: string;
  transaction_type: "sell";
  stock_value: number;
  quantity: number;
  brokerage_fee: number;
  total_amount: number;
  tp_price: number;
  sl_price: number;
  date: string;
  time: string;
}) => {
  return axios.post("http://localhost:8080/placeSellOrder", sellOrderInfo);
};

// _id: string;
// image: File | null;
// notes: string;
export const addTransactionNotes = async (notesInfo: {
  [key: string]: any;
}): Promise<AxiosResponse<any>> => {
  return axios.post<any, AxiosResponse<any>>(
    "http://localhost:8080/transaction-notes",
    notesInfo
  );
};
