import express from 'express';
import mine from '../utilities/mine.js';
import config from '../config.json' with { type: "json" };
import { getPage, buildData, testData } from '../module/dataActions.js';
// const require = createRequire(import.meta.url);
// const config = require('../config.json');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send("Hello World!");
});

routes.get('/:id', async (req, res) => {
    const data = await getPage(config.src, req.params.id);
    const result = mine(data, ['img']);
    return res.send(result);
});

routes.get('/build/:id', async (req, res) => {
    const id = req.params.id;
    const data = await getPage(config.src, id);
    const msg = await buildData(data, id).catch(err => {
        res.status(500).send({ msg: 'error', err });
    });
    res.send(msg);
});

routes.get('/test/:id', async (req, res) => {
    const id = req.params.id;
    const data = await getPage(config.src, id);
    const msg = testData(data, id);
    console.log(msg);
    res.send(msg);
});

export default routes;