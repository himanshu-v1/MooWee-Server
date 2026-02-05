import { MongoClient } from "mongodb";
import config from "../config.json" with { type: "json" };

const getConnection = (collectionName) => {
    const connObj = config.db;
    const url = process.env.MONGO_URL || connObj.connectionString;

    // const client = new MongoClient(connObj.connectionString);
    const client = new MongoClient(url);
    const db = client.db(connObj.dbName);
    const collection = db.collection(collectionName);

    return {client, collection};
}

export default getConnection;