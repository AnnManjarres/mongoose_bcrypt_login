require('dotenv').config()
let express = require('express')
let app = express()
let authRoutes = require('./router/auth')
let morgan = require('morgan')

let port = process.env.PORT

app.use(express.json())
app.use(morgan('tiny'))
app.use('/', authRoutes)


app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`)
})
