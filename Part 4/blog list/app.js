const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const midddleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.infor('Connecting to : ', config.mongoUrl)
mongoose.connect(config.mongoUrl).then(
    () => {
        logger.infor('.......Connected to the database......')
    }
).catch(
    error => {
        logger.error('Error Connecting to DB: ', error.message)
    }
)

app.use(cors())
app.use(express.json())
app.use(midddleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(midddleware.unknownEndPoint)
app.use(midddleware.errorHandler)

module.exports = app