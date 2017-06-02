import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import user from './app/modules/user';

const app = express(); // Our express server!
const port = process.env.PORT || 8080;
const DbConnectionString = "mongodb://localhost/full";

// DB connection through Mongoose
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}; // Just a bunch of options for the db connection
mongoose.Promise = global.Promise;
// Don't forget to substitute it with your connection string
mongoose.connect(DbConnectionString, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Body parser and Morgan middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// We tell express where to find static assets
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Router Injection
console.log(`Route Injection Start`);
console.log(`User Route`);
app.use(user.router);

// For all the other requests just sends back the Homepage
console.log("Other Route Default Page");
app.route("*").get((req, res) => {
    res.sendFile('client/dist/index.html', { root: __dirname });
});

console.log(`Route Injection Completed`);









app.listen(port);
console.log(`listening on port ${port}`);