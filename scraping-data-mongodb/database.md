# stock_market
## stock_market

- _id: ObjectId

- market: string
- company_name: string
- stock_symbol: string
- country: string
- IPO_year: int
- volume: int
- sector: string
- industry: string

## stock_news

- _id: ObjectId

- header: string
- content: string
- date: string
- time?: string

- sentiment: boolean




# demo_trading
## demo_transactions

- _id: ObjectId

- market: string
- company_name: string
- stock_symbol: string
- transaction_type: string
- stock_value: double
- quantity: int
- brokerage_fee: double
- total_amount: double
- date: string
- time: string

## demo_holdings

- _id: ObjectId

- market: string
- company_name: string
- stock_symbol: string
- avg_cost_price: double
- quantity: int
- total_cost_price: double
- equity: double
- latest_closing_price: double

## transaction_notes

- _id: ObjectId

- image: object
  - data: binData
  - contentType: string
- notes: string