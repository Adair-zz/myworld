// for stockSelectSlice
export interface SelectedStockType {
  status: string;
  market: string;
  company_name: string;
  stock_symbol: string;
}

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
  demo_holdings: StockHoldingsType;
  live_holdings: StockHoldingsType;
}
