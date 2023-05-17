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


def mongo():
    mongo = MongodbOperation()
    client = mongo.connect_mongodb()
    database = mongo.get_database("myworld")
    collection = mongo.get_collection("demo_trading")


if __name__ == '__main__':
    mongo()

