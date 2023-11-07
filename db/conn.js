require('dotenv').config()
let mongoose = require('mongoose')

class MongoConnection {

    static openConnection(){
        mongoose.connect(process.env.DB_CONNECTION)
        .then(() => {console.log("Mongo connected")})
    }
}

module.exports = MongoConnection