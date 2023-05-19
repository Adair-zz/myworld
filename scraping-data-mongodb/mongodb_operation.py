from pymongo.mongo_client import MongoClient
import os
import configparser


class MongodbOperation:
    def __init__(self):
        self.config = configparser.ConfigParser()
        self.config.read(self.config_abs_path())
        self.username = self.config.get("Credentials", "username")
        self.password = self.config.get("Credentials", "password")
        self.uri = f"mongodb+srv://{self.username}:{self.password}@cluster0.ueqfnze.mongodb.net/"
        self.client = None
        self.database = None
        self.collection = None

    def config_abs_path(self):
        config_dir = os.path.dirname(os.path.abspath("D:\\Repository\\myworld\\scraping-data-mongodb\\config.ini"))
        config_path = os.path.join(config_dir, "config.ini")
        return config_path

    def connect_mongodb(self):
        try:
            self.client = MongoClient(self.uri)
            return self.client
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
            return None

    def get_database(self, database_name):
        try:
            self.database = self.connect_mongodb()[database_name]
            return self.database
        except Exception as e:
            print(f"Failed to get database '{database_name}': {e}")
            return None

    def get_collection(self, collection_name):
        try:
            self.collection = self.database[collection_name]
            return self.collection
        except Exception as e:
            print(f"Failed to get collection '{collection_name}': {e}")
            return None

    def create_collection(self, new_collection_name):
        try:
            return self.database.create_collection(new_collection_name)
        except Exception as e:
            print(f"Failed to crate new collection: {e}")
            return None

    def drop_collection(self, collection_name):
        try:
            return self.database.drop_collection(collection_name)
        except Exception as e:
            print(f"Failed to drop collection: {e}")
            return None

    def get_list_collection_names(self):
        try:
            return self.database.list_collection_names()
        except Exception as e:
            print(f"Failed to get list of collection names: {e}")
            return []

    def insert_document(self, document):
        assert isinstance(document, dict)
        try:
            self.collection.insert_one(document)
        except Exception as e:
            print(f"Failed to insert one document: {e}")

    def insert_documents(self, documents):
        assert isinstance(documents, list)
        try:
            self.collection.insert_many(documents)
        except Exception as e:
            print(f"Failed to insert many documents: {e}")

    def get_document(self, specific_elements):
        assert isinstance(specific_elements, dict)
        try:
            document = self.collection.find_one(specific_elements)
            return document
        except Exception as e:
            print(f"Failed to get document: {e}")
            return None

    def get_document_number(self, specific_elements):
        assert isinstance(specific_elements, dict)
        try:
            return self.collection.count_documents(specific_elements)
        except Exception as e:
            print(f"Failed to count document: {e}")
            return None

    def range_queries(self, specific_elements):
        assert isinstance(specific_elements, dict)
        try:
            key_list = list(specific_elements.keys())
            specific_elements[key_list[0]] = {"$lt": specific_elements[key_list[0]]}
            return self.collection.find(specific_elements)
        except Exception as e:
            print(f"Failed to execute range queries: {e}")
            return None
