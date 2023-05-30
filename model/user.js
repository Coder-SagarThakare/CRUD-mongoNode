const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    password: {
        type:String,
        required : true
    },

    mobileNo : {
        type : Number,
        required : true,
    },
    email : {
        type : String,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model('users',userSchema)