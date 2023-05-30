
const mongoose = require('mongoose');

const empSchema = mongoose.Schema ({
    empName : {
        type : String,
        required : true,
    },
    techStack :{
        type:String,
        required : true
    }
})

module.exports = mongoose.model('empData',empSchema);
