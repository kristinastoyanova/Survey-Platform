const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;


//mongoose wants specific schema of records inside collections
const userSchema = new Schema({
    googleId: String
});

//create new collection 'users'
mongoose.model('users', userSchema);