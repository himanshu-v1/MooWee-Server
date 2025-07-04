import express from 'express';
import { getWall, getTvWall } from '../module/dataActions.js';

const routes = express.Router();

routes.get('/movies', async (req, res) => {
    const result = await getWall();
    res.send(result);
});

routes.get('/tv', async (req, res) => {
    const result = await getTvWall();
    res.send(result);
});

export default routes;