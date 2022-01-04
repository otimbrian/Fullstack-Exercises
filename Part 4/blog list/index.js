const http = require('http')
const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
const midddleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())
app.use(midddleware.requestLogger)

app.use(blogsRouter)

app.use(midddleware.unknownEndPoint)
app.use(midddleware.errorHandler)

app.listen(config.PORT, () => {
    logger.infor(`Server running on port ${config.PORT}`)
})