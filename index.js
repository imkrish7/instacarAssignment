const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const Promisify  = require('bluebird');
const app = express();

const userRouter = require('./routes/userRoutes');

const client = redis.createClient(config.redis_port);

const redis_client = Promisify.promisifyAll(client);



mongoose.connect(config.mongo_uri, { useNewUrlParser: true})

mongoose.connection.on('error', error=>{
	console.log('error');
})


redis_client.on('connect', ()=>{
	console.log('redis is connected')
})


const redisClient  = (req, res,next)=>{
	req.redis_client = redis_client;
	next();
}
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
app.use(redisClient);

app.use('/api', userRouter);

app.listen(5000, ()=> {
	console.log("Server is listening....");
})

module.exports = app;