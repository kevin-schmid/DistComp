import pymongo


class WriteToMongo:
  def __init__(self, data,db_name):
    self.db_name = db_name
    self.data = data

  def writeToMongo(self):
      client = pymongo.MongoClient(
          "mongodb://admin:admin@cluster0-shard-00-00-u60tn.gcp.mongodb.net:27017,cluster0-shard-00-01-u60tn.gcp.mongodb.net:27017,cluster0-shard-00-02-u60tn.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")
      db = client.players

      mycol = db[self.db_name]

      x = mycol.insert_many(self.data)
      print(x.inserted_ids)
