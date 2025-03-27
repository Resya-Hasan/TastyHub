if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const cors = require('cors')
const express = require('express')
const app = express()

const errorHandleMiddleware = require('./middleware/errorHandle')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use('/', require('./routers'))

app.use(errorHandleMiddleware)

module.exports = app