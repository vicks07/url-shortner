const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
const connection = mongoose.createConnection('mongodb+srv://urlshort:nBEaYuUvvfXBXXRy@cluster0-bkxjo.mongodb.net/shortner?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

autoIncrement.initialize(connection);

const ShortUrlSchema = new Schema({
    url: String,
    code: String,
    num: {
        type:Number,
        ref: 'SerialNo'
    },
    count: Number
},{
    collection: 'shorturls',
    timestamps:{ 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

ShortUrlSchema.plugin(autoIncrement.plugin, {
    model: 'ShortUrl', 
    field: 'num',
    startAt:3,
    incrementBy:1
});

const ShortUrl = connection.model('ShortUrl',ShortUrlSchema);

module.exports = ShortUrl;