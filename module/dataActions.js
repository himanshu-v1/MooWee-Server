import getConnection from "../utilities/connection.js";
import mine from "../utilities/mine.js";
import axios from 'axios';
import config from '../config.json' with { type: "json" };

const getPage = async (src, id) => {
  const response = await axios.get(src+id);
  const data = await response.data;
  return data;
};

const buildData = async (data, id) => {
  const {client, collection} = await getConnection(config.db.dataCollectionName);
  const wall = mine(data);
  wall.id = id;
  try {
    await client.connect();
    const msg =  await collection.insertOne(wall);
    return { msg: "Success", id: msg.insertedId };
  } finally {
    client.close();
  }
};

const testData = (data, id) => {
  try {
    const wall = mine(data);
    wall.id = id;
    return wall;
  } finally {
    console.log("Test Complete");
  }
};

const getWall = async () => {
  const {client, collection} = await getConnection(config.db.dataCollectionName);
  try {
    await client.connect();
    const data = await collection.find().toArray();
    return {msg: "Success", data};
  } finally {
    client.close();
  }
};

export { getPage, buildData, testData, getWall };