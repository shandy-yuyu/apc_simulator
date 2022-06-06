const logger = require('./logger')('MONGODB');
// const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('config').db;

const { MongoClient, ServerApiVersion } = require('mongodb');
// const client = new MongoClient(dbConfig.url);
logger.info(`MongoDB try to connect to ${dbConfig.url}`);
const client = new MongoClient(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let db = undefined;

// const connect = () => {
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// }

const connect = async function () {
  if (db) return db;
  // connect to MongoDB
  await client.connect();
  await listDatabases(client);

  db = client.db(dbConfig.dbName);

  if (!db) {
    logger.info('MongoDB connected failed!');
    logger.info(`MongoDB failed connect to ${dbConfig.url}`);
    return;
  }
  else {
    logger.info(`MongoDB successfully connect to ${dbConfig.url}`);

    // exist: update value/ not exist: init
    for (const [key, value] of Object.entries(dbConfig.initValue)) {
      logger.info(`init default value: ${key}=${value}`);
      getCollection('factors').updateOne(
        { name: key },
        { $set: { name: key, value: value } },
        { upsert: true },
      );
    }
    return db;
  }
  
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const disconnect = () => {
  if (!db) return;
  logger.info('MongoDB successfully disconnected!');
  client.close();
}

const getCollection = (collectionName) => {
  if (!db) {
    logger.error('The database is not connected, you should call `connect()` first.');
    return;
  }
  return db.collection(collectionName);
}

module.exports = {
  connect,
  disconnect,
  getCollection,
};