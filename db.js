const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/SheyRooms");
var connection = mongoose.connection

connection.on('error',()=>{
    console.log("MongoDB Connection failed");
})
connection.on('connected',()=>{
    console.log("MongoDB Connection Successfully");
})

module.exports = mongoose;