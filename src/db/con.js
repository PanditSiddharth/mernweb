require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DBD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true
}).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});