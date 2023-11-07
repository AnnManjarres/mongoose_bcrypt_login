let mongoose = require('mongoose')
let { Schema } = mongoose

let user = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

let User = mongoose.model('users', user)

module.exports = User