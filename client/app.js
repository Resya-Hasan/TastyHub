require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const errorHandleMiddleware = require('./middleware/errorHandle')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', require('./routers'))

app.use(errorHandleMiddleware)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})