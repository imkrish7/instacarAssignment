module.exports = {
	redis_port: '6379',
	mongo_uri: {
		production: 'mongodb+srv://instacar:instacar@cluster0-zz1zn.mongodb.net/instacar?retryWrites=true&w=majority',
		development: 'mongodb://localhost:27017/instacar',
	},
};