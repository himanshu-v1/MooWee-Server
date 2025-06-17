import express from 'express';
import { getWall } from '../module/dataActions.js';

const routes = express.Router();

routes.get('/movies', async (req, res) => {
    const result = await getWall();
    console.log(result.data);
    res.send(result);
});

export default routes;