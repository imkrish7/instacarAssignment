const express = require('express');
const config = require('./config');
const cors = require('cors');
const redis = require('redis');
const Promisify  = require('bluebird');
const app = express();

const userRouter = require('./routes/userRoutes');

const client = redis.createClient(config.redis_port);

const redis_client = Promisify.promisifyAll(client);

redis_client.on('connect', ()=>{
	console.log('redis is connected')
})


const redisClient  = (req, res,next)=>{
	req.redis_client = redis_client;
	next();
}
app.use(express.json());
app.use(cors());
app.use(redisClient);

app.use('/api', userRouter);

app.listen(5000, ()=> {
	console.log("Server is listening....");
})