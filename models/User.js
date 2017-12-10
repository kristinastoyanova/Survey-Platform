const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;


//mongoose wants specific schema of records inside collections
const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default: 0}
});

//create new collection 'users'
mongoose.model('users', userSchema);