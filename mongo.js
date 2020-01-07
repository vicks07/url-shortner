const {MongoClient, ObjectId} = require('mongodb');

let db;
let connection = process.env.MONGO_URI;

MongoClient.connect(connection,
    {useNewUrlParser: true,  useUnifiedTopology: true },
    function(err, client) {
    if(err) throw err;
    db = client.db('shortner');
  });


let SaveUrl = (url)=>{
    return new Promise((resolve,reject)=>{
        db.collection('shorturls').insertOne(url).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        });
    })
}

let GetUrl = (url)=>{
    //console.log('URL',url);
    return new Promise((resolve,reject)=>{
        db.collection('shorturls').findOne({code:url.code}).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        });
    })
}

let UpdateCount = (url)=>{
    return new Promise((resolve,reject)=>{
        db.collection('shorturls').updateOne({code:url.code},{$inc:{count:1}}).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
}

let RequestLog = (url)=>{
    return new Promise((resolve,reject)=>{
        db.collection('requestlog').insertOne(url).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        });
    });
    
}

module.exports = {
    Save: SaveUrl,
    Read: GetUrl,
    Count: UpdateCount,
    Log: RequestLog
}