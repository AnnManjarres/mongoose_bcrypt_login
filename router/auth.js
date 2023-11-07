let express = require('express')
const MongoConnection = require('../db/conn')
let User = require('../models/User')
let bcrypt = require('bcrypt')
let router = express.Router()

let saltRounds = 10

router.get('', async (req, res) => {
    MongoConnection.openConnection()
    let users = await User.find({})

    if(!users) res.send("No se encontraron usuarios")
    if(users) res.send(users)

})

router.post('/signup', (req, res) => {
    let body = req.body

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(body.password, salt, (err, hash) => {
            if(err) throw err;

            let newUser = new User({
                username: body.username,
                password: hash
            })

            MongoConnection.openConnection()

            newUser.save()
            .then(() => {res.send(newUser)})
            .catch((err) => {console.log(err)})

        })
    })
    
})

router.post('/login', async (req, res) => {
    let body = req.body

    MongoConnection.openConnection()

    let user = await User.findOne({username: body.username})
    if(!user) {
        res.send("Usuario no existe")
    } else {
        bcrypt.compare(body.password, user.password, (err, response) => {
            if (err) throw err;
            response ? res.send("Logged in ") : res.send("No se autentico correctamente")
        })
    }
})


module.exports = router