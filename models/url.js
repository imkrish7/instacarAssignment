const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
	longUrl: String,
	shortUrl: String,
	date: String
},{timestamps: true});

const Url = mongoose.model('Url', urlSchema)

module.exports = Url;
 