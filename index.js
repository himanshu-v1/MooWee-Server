import express from 'express';
import routes from './router/handler.js';
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'));
// require('./routes')(app);

app.use('/', routes);

const port = process.env.PORT || 4000;
app.listen(port);