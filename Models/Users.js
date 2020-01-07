const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connection = mongoose.createConnection(process.env.MONGO_URI);

const UserSchema = new Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required: true
    }
},{
    collection: 'users',
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Users = connection.model('User',UserSchema);

module.exports = Users;

