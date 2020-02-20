const express = require('express');
const Url = require('../models/url');
const router = express.Router();

router.post('/add',async (req,res)=>{
	const ip = req.headers['origin'].toString().split('/')[2].split(':')[0];
	try {
		const ip_exist = await req.redis_client.getAsync(ip);	
		if(ip_exist){
			if(parseInt(ip_exist) == 100){
				return res.status(200).send({ limit: true });
			}else{
				await req.redis_client.incrAsync(ip);
				return res.status(200).send({ success: true });
			}
		}else{
			await req.redis_client.setAsync(ip, 1);
			return res.status(200).send({ success: true});
		}
	} catch (error) {
		console.log(error);
		return res.status(400).send({success: false, msg: "Something went wrong"});
	}
	
	
})


module.exports = router;