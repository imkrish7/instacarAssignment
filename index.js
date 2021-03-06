const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const Promisify = require('bluebird');
const app = express();

const isDev = process.env.NODE_ENV ? process.env.NODE_ENV : "production";
const userRouter = require('./routes/userRoutes');

const client = redis.createClient(config.redis_port);

const redis_client = Promisify.promisifyAll(client);
mongoose.connect(config.mongo_uri[isDev], { useNewUrlParser: true });

mongoose.connection.on('error', error => {
	console.log('error');
});

redis_client.on('connect', () => {
	console.log('redis is connected');
});

const redisClient = (req, res, next) => {
	req.redis_client = redis_client;
	next();
};
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(redisClient);



app.use('/api', userRouter);

if (isDev == 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
	});
}

app.listen(5000, () => {
	console.log('Server is listening....');
});

module.exports = app;
