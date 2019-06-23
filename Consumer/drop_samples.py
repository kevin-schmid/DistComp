import pymongo

client = pymongo.MongoClient("mongodb://admin:admin@cluster0-shard-00-00-u60tn.gcp.mongodb.net:27017,cluster0-shard-00-01-u60tn.gcp.mongodb.net:27017,cluster0-shard-00-02-u60tn.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client.test
mycol = db["players"]

mycol.drop()