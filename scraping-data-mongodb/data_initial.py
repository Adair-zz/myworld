from mongodb_operation import MongodbOperation
from datetime import datetime

def get_time():
    current_datetime = datetime.now()

    # Access individual date and time components
    year = current_datetime.year
    month = current_datetime.month
    day = current_datetime.day
    hour = current_datetime.hour
    minute = current_datetime.minute
    second = current_datetime.second

    date = f"{month}/{day}/{year}"
    time = f"{hour}:{minute}:{second}"
    return {"date": date, "time": time}

def initialize_demo_trading(mongo):
    # mongo.create_collection("demo_trading")
    mongo.get_collection("demo_trading")

    data = {"market": "NASDAQ",
            "company_name": "Alibaba Group Holding Limited American Depositary Shares each representing eight Ordinary share",
            "stock_symbol": "BABA",
            "transaction_type": "sell",
            "stock_value": 10.10,
            "quantity": 100,
            "brokerage_fee": 10.25,
            "equity": 1010.25,
            "date": get_time()["date"],
            "time": get_time()["time"]
            }

    mongo.insert_document(data);
    print("Demo Trading: Success")
    return None

def initialize_stock_holdings(mongo):
    # mongo.create_collection("stock_holdings")
    mongo.get_collection("stock_holdings")

    data = {"market": "NASDAQ",
            "company_name": "Alibaba Group Holding Limited American Depositary Shares each representing eight Ordinary share",
            "stock_symbol": "BABA",
            "avg_cost_price": 10.10,
            "quantity": 100,
            "total_cost_price": 100.35,
            "equity": 1010.25,
            "latest_closing_price": 10.25,
            "return": -10.23,
            }

    mongo.insert_document(data)
    print("Stock Holdings: Success")
    return None

def currentStock():
    return None

if __name__ == '__main__':
    mongo = MongodbOperation()
    mongo.connect_mongodb()
    mongo.get_database("myworld")

    initialize_demo_trading(mongo)
    # initialize_stock_holdings(mongo)