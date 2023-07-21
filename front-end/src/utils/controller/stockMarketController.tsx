import axios from "axios";

export const getStockMarket = async () => {
  return await axios.get("http://localhost:8080/stock-market");
};

export const getStockByCompanyName = async (company_name: string) => {
  return await axios.get(
    `http://localhost:8080/stock-market/company-name/${company_name}`
  );
};

export const getStockByStockSymbol = async (stock_symbol: string) => {
  return await axios.get(
    `http://localhost:8080/stock-market/stock-symbol/${stock_symbol}`
  );
};
