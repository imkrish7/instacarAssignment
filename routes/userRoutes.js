const express = require('express');
const Url = require('../models/url');
const validUrl = require('valid-url');
const shortID = require('shortid');
const router = express.Router();




router.post('/add',async (req,res)=>{
	const ip = (req.headers['origin'] && req.headers['origin']
				.toString()
				.split('/')[2]
				.split(':')[0]) || req.connection.remoteAddress.toString().split(':')[3];
	
	let longUrl = req.body.longUrl, customeUrl;
	customeUrl = req.body.customUrl;
	try {	
		const ip_exist = await req.redis_client.getAsync(ip);	
		if(ip_exist){
			if(parseInt(ip_exist) == 100){
				return res.status(400).send({success: false, data: { limit: true} });
			}else{
				
				let url = await Url.findOne({ longUrl });
				if(url){
					return res.status(401).send({ success: false, data: { invalidUrl: true } });
				}else{
					if(validUrl.isUri(longUrl)){
						await req.redis_client.incrAsync(ip);
						const shortUrlCode = shortID.generate();
						const shortUrl = customeUrl.length > 0 ? customeUrl : 'http://'+shortUrlCode;
						const newUrl = new Url({
							longUrl,
							shortUrl,
							date: new Date()
						})

						newUrl.save();
						return res.status(200).send({ success: true });
					}else{
						return res.status(401).send({success: false, data: {invalidUrl: true}});
					}
				}
			}
		}else{
			
			let url = await Url.findOne({ longUrl });
				if(url){
					return res.status(401).send({ success: false, data: { invalidUrl: true } });
				}else{	
					if(validUrl.isUri(longUrl)){
						
						await req.redis_client.setAsync(ip, 1);
						const shortUrlCode = shortID.generate();
						const shortUrl = customeUrl.length > 0 ? customeUrl : 'http://' +shortUrlCode;
						const newUrl = new Url({
							longUrl,
							shortUrl,
							date: new Date()
						})
						newUrl.save();
						return res.status(200).send({ success: true });
					}else{
						return res.status(401).send({success: false, data: {invalidUrl: true}});
					}
				}
		}
	} catch (error) {
		console.error(error);
		return res.status(401).send({success: false, data: { msg: "Something went wrong"}});
	}
})

router.get('/list', async(req,res)=>{
	const url = await Url.find({});
	return res.status(200).send({ success: true, data: url});
})


module.exports = router;