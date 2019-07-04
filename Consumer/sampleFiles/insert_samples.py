
import pymongo

#client = pymongo.MongoClient("mongodb://cluster0-u60tn.gcp.mongodb.net/")
client = pymongo.MongoClient("mongodb://admin:admin@cluster0-shard-00-00-u60tn.gcp.mongodb.net:27017,cluster0-shard-00-01-u60tn.gcp.mongodb.net:27017,cluster0-shard-00-02-u60tn.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client.players

mycol = db["players"]

mylist = [
  { "user": "kevin", "games_won": "1", "games_lost": "400", "ranking" : "5"},
  { "user": "kevin1", "games_won": "2", "games_lost": "300", "ranking" : "4"},
  { "user": "kevin2", "games_won": "3", "games_lost": "200", "ranking" : "3"},
  { "user": "kevin3", "games_won": "4", "games_lost": "100", "ranking" : "2"},
  { "user": "kevin4", "games_won": "5", "games_lost": "10", "ranking" : "1"}
]

x = mycol.insert_many(mylist)

#print list of the _id values of the inserted documents:
print(x.inserted_ids)