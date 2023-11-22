const mongoose = require("mongoose");

const db = () => {

    mongoose.connect("mongodb+srv://umit:db2UL8BUnodSJntr@cluster0.0zepwnu.mongodb.net/").then(() => {
        console.log("mongoDB connected");
    }).catch((err) => {
        console.log(err);
    })

}

module.exports = db