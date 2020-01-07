const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
const connection = mongoose.createConnection(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

autoIncrement.initialize(connection);

const ShortUrlSchema = new Schema({
    url: {
        type: String,
        required:true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    num: {
        type:Number,
        ref: 'SerialNo'
    },
    count: {
        type: Number,
        default: 0
    }
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