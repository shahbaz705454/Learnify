const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log("DB connection Succcessfull") })
        .catch((err) => {
            console.log("Db connection failed", err);
            process.exit(1)
        })
};