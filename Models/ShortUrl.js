const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = mongoose.createConnection('mongodb+srv://urlshort:nBEaYuUvvfXBXXRy@cluster0-bkxjo.mongodb.net/shortner?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const ShortUrlSchema = new Schema({
    url: String,
    code: String,
    count: Number
},{
    collection: 'shorturls',
    timestamps:{ 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const ShortUrl = connection.model('ShortUrl',ShortUrlSchema);

module.exports = ShortUrl;