import express from 'express';
import { getWall } from '../module/dataActions.js';

const routes = express.Router();

routes.get('/movies', async (req, res) => {
    const result = await getWall();
    res.send(result);
});

export default routes;