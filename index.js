const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crypto = require("crypto");

const mongo = require('./mongo.js');

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
	let code = req.params.val;
	let headers = req.headers;
    //console.log('COde',req.headers);
    //let {url, count} = urls[code];

    if(code!=='favicon.ico' && code!=null){
        let resp = await mongo.Read({code});
        if(resp.code!== undefined){
			await mongo.Count({code});
			await mongo.Log({
				userAgent:headers,
				date: new Date(),
				code: code
			 });
        }
        console.log(resp);
		return res.redirect(resp.url);
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
})

app.listen(3002,()=>{
    console.log('Server started');
})


