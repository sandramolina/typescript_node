// External Dependencies
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

// Global Variables
export const collections: { restaurants?: mongoDB.Collection } = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const restaurantsCollection: mongoDB.Collection = db.collection(
    process.env.RESTAURANTS_COLLECTION_NAME
  );

  collections.restaurants = restaurantsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${restaurantsCollection.collectionName}`
  );
}
