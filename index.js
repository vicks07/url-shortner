const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crypto = require("crypto");
const dotenv = require('dotenv');
const mongo = require('./mongo.js');

dotenv.config({
	path: './config/config.env'
});


const {Log} = require('./Models/Log.js');
const ShortUrl = require('./Models/ShortUrl.js'); 
// console.log('ENV',process.env);

// let urls = {
//     /*    url:'https://fitternity.com',
//         count: 0
//     },
//     'one':{
//         url:'https://www.fitternity.com/onepass',
//         count:0
//     }*/
// }

app.use(bodyParser.json());

app.get('/:val',async(req,res)=>{
	try{
	let code = req.params.val;
	let headers = req.headers;
		if(code!=='favicon.ico' && code!=null){
			//let resp = await mongo.Read({code});
			let resp = await ShortUrl.findOne({code:code});
			//console.log('resppp',resp);
			if(resp.code!== undefined){
				await ShortUrl.updateOne({code:code},{$inc:{count:1}});
				//await mongo.Count({code});

				const log = new Log({
					userAgent: headers,
					code: code
				});

				let logResp = await log.save();
				//console.log('logResp',logResp);

				// log.save((err)=>{
				// 	if(err) throw err;

				// 	console.log('Saved');
				// });

				// await mongo.Log({
				// 	userAgent:headers,
				// 	date: new Date(),
				// 	code: code
				//  });
			}
			return res.redirect(resp.url);
		} 
	}catch(err){
		console.log(err);
	}
	
	//request.connection.remoteAddress
    
    //count++;
    // console.log(url.url,url.count);

    return res.send('Something went wrong!');
})
//nBEaYuUvvfXBXXRy
//urlshort
app.post('/new/',async(req,res)=>{
    const id = crypto.randomBytes(3).toString('hex');
    let url = new ShortUrl({
        url: req.body.url,
        count: 0,
        code: id
	});
	let resp = await ShortUrl.findOne({code:code});
	if(resp.code == undefined){
		//await mongo.Save(url);
		await url.save();
		//console.log(urls);
		return res.send('Success');
	}
	else{
		return res.send('Oops! Something went wrong');
	}
});

app.post('/custom',async(req,res)=>{
	let {url,code} = req.body;
	if(code.length <= 6){
		let resp = await ShortUrl.findOne({code:code});
		if(resp == null){
			let redirectionUrl = new ShortUrl({
				url: url,
				code: code,
				count: 0
			})
			await redirectionUrl.save();
			return res.send('Success');
		}
		else{
			return res.send(`Code ${code} already exists`);
		}
	}
	else{
		return res.send(`Code ${code} is too long`);
	}
	
});

app.listen(3002,()=>{
    console.log('Server started');
});


