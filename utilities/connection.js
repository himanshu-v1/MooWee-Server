import { MongoClient } from "mongodb";
import config from "../config.json" with { type: "json" };

const getConnection = (collectionName) => {
    const connObj = config.db;
    const client = new MongoClient(connObj.connectionString);
    const db = client.db(connObj.dbName);
    const collection = db.collection(collectionName);

    return {client, collection};
}

export default getConnection;