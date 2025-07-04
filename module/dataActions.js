import getConnection from "../utilities/connection.js";
import mine from "../utilities/mine.js";
import axios from 'axios';
import { dataList, detailList, dataTvList } from '../interfaces/types.js';
import config from '../config.json' with { type: "json" };

const getPage = async (src, id) => {
  try {
    const response = await axios.get(src+id);
    const data = await response.data;
    return data;
  } catch(err) {
    throw new Error("invalid");
  }
};

const buildData = async (data, id, action) => {
  let collName = '';
  let dList = [];
  switch(action) {
    case 'movies':
      collName = config.db.dataCollectionName;
      dList = dataList;
      break;
    case 'tv':
      collName = config.db.dataTvCollectionName;
      dList = dataTvList;
      break;
    default: break;
  }

  const {client, collection} = await getConnection(collName);
  const wall = mine(data, dList, false);
  wall.id = id;
  try {
    await client.connect();
    const msg =  await collection.insertOne(wall);
    return { msg: "Success", id: msg.insertedId };
  } finally {
    client.close();
  }
};

const testData = (data, id, isTv) => {
  const list = isTv ? dataTvList : dataList;
  try {
    const wall = mine(data, list, false);
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

const getMovieData = async (url, id) => {
  const data = await getPage(url, id);
  const result = mine(data, detailList, true);
  return result;
};

const getTvWall = async () => {
  const {client, collection} = await getConnection(config.db.dataTvCollectionName);
  try {
    await client.connect();
    const data = await collection.find().toArray();
    return {msg: "Success", data};
  } finally {
    client.close();
  }
};

export { getPage, buildData, testData, getWall, getMovieData, getTvWall };