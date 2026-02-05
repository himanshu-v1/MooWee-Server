import getConnection from "../utilities/connection.js";
import mine from "../utilities/mine.js";
import axios from 'axios';
import { dataList, detailList, dataTvList, detailTvList } from '../interfaces/types.js';
import config from '../config.json' with { type: "json" };
import { getUserAgentHeader } from '../utilities/setHeaders.js';

const getPage = async (src, id) => {
  const url = src + id;
  const headers = getUserAgentHeader();
  try {
    const response = await axios.get(url, headers);
    return response.data;
  } catch (err) {
    // log err.response?.status and err.response?.data for debugging
    throw new Error(`Invalid. ${err}`);
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

const getTvData = async (url, id) => {
  const data = await getPage(url, id);
  const result = mine(data, detailTvList, true);
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

export { getPage, buildData, testData, getWall, getMovieData, getTvWall, getTvData };