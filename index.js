import express from 'express';
import cardRoutes from './router/cardHandler.js';
import wallRoutes from './router/wallHandler.js';
import bodyParser from "body-parser";
import { setHeaders } from './utilities/setHeaders.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'));
// require('./routes')(app);
app.use((req, res, next) => {
    setHeaders(res);
    next();
});
app.use('/wall', wallRoutes);
app.use('/', cardRoutes);

const port = process.env.PORT || 4000;
app.listen(port);