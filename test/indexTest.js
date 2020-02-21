const chai = require('chai');
const Url = require('../models/url');
const assert  = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);

describe("Server", ()=>{
	describe("GET Request",()=> {
			it("It should get all the urls", (done)=>{
				chai.request(app)
					.get('/api/list')
					.end((error,res)=>{
						assert.equal(res.status, 200);
						// console.log(res.body);
						assert.isArray(res.body.data);
						done();
					})
			})
	});

	describe('POST Request', ()=>{

		it('It should give error', done => {
			const newUrl = {};
			chai.request(app).post('/api/add').send(newUrl).end((err, res) => {
				assert.equal(res.status, 401);
				assert.equal(res.body.success, false);
				done();
			});
		});

		it("It should add url", (done)=>{
			const newUrl = {
				longUrl: "https://www.mongodb.com/",
				customUrl: ""
			};
			chai.request(app)
				.post('/api/add')
				.send(newUrl)
				.end((err,res)=>{
					assert.equal(res.status, 200);
					assert.equal(res.body.success, true)
					done();
				})
		})

		it('It should give invalid url', done => {
			let newUrl = { longUrl: 'www.mongodb.com', customUrl: '' };
			chai.request(app).post('/api/add').send(newUrl).end((err, res) => {
				assert.equal(res.status, 401);
				assert.equal(res.body.success, false);
				assert.equal(res.body.data.invalidUrl, true);
				done();
			});
		});


		it('It should give invalid url', done => {
			let newUrl = { longUrl: 'https://www.mongodb.com/', customUrl: '' };
			chai.request(app).post('/api/add').send(newUrl).end((err, res) => {
				assert.equal(res.status, 401);
				assert.equal(res.body.success, false);
				assert.equal(res.body.data.invalidUrl, true);
				done();
			});
		});
// for this set requesting ip to 100 or once ip completed 100 request. Then only pass
			it('It should give ip limit', done => {
				let newUrl = { longUrl: 'https://www.mongodb.com/', customUrl: '' };
				chai.request(app).post('/api/add').send(newUrl).end((err, res) => {
					assert.equal(res.status, 400);
					assert.equal(res.body.success, false);
					assert.equal(res.body.data.limit, true);
					done();
				});
			});
		
	})
})