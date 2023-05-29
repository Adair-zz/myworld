// for stockMarket
export interface StockMarketType {
  _id: string;
  market: string;
  company_name: string;
  stock_symbol: string;
  country: string;
  IPO_year: number | undefined;
  volume: number | undefined;
  sector: string;
  industry: string;
}

// for stockSelectSlice
export interface SelectedStockType {
  status: string;
  market: string;
  company_name: string;
  stock_symbol: string;
}

// for stockHoldingsSlice
export interface StockHoldingsType {
  _id: string;
  market: string;
  company_name: string;
  stock_symbol: string;
  avg_cost_price: number | undefined;
  quantity: number | undefined;
  total_cost_price: number | undefined;
  equity: number | undefined;
  latest_closing_price: number | undefined;
}

export interface StockHoldingsSlice {
  demo_holdings: StockHoldingsType[];
  live_holdings: StockHoldingsType[];
}

// for stockTransactionsSlice
export interface StockTransactionsType {
  _id: string;
  market: string;
  company_name: string;
  stock_symbol: string;
  transaction_type: string;
  stock_value: number | undefined;
  quantity: number | undefined;
  brokerage_fee: number | undefined;
  equity: number | undefined;
  date: string;
  time: string;
}

export interface StockTransactionsSlice {
  demo_transactions: StockTransactionsType[];
  live_transactions: StockTransactionsType[];
}
