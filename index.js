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

let urls = {
    /*    url:'https://fitternity.com',
        count: 0
    },
    'one':{
        url:'https://www.fitternity.com/onepass',
        count:0
    }*/
}

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
    console.log(req.body.url);
    const id = crypto.randomBytes(3).toString('hex');
    urls[id] = {
        url: req.body.url,
        count: 0,
        code: id
    }
    await mongo.Save(urls[id]);
    console.log(urls);
    return res.send('Success');
});

app.listen(3002,()=>{
    console.log('Server started');
});


