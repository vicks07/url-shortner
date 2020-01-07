const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connection = mongoose.createConnection(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const LogSchema = new Schema({
    userAgent : {
        host: {
            type: String
        },
        'if-none-match': String,
        'upgrade-insecure-requests': Number,
        'accept': String,
        'accept-language': String,
        'accept-encoding': String,
        'connection': String,
        'user-agent': {
            type: String
        },
        accept:{
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    code: String
},{
    collection: 'requestlog',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'}
});

const Log = connection.model('Log',LogSchema);

module.exports = {
    Log
}




