const mongoose = require('mongoose');

const eschema = new mongoose.Schema({
    name : {
        type:String
    },
    password : {
        type:String
    },
    phone : {
        type: String
    },
    gender : {
        type: String
    },
    email :{
        type: String
    },
    address : {
        type: String
    }

});

const Register = new mongoose.model("Register", eschema);

module.exports = Register;