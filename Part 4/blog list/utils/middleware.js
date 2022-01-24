const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.infor('Method: ', request.method)
    logger.infor('Path: ', request.path)
    logger.infor('Body: ', request.body)
    logger.infor('.............................')
    next()

}

const unknownEndPoint = (request, response) => {
    response.status(404).send({ 'error': 'unknown Endpoints' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send({ 'error' : 'Malformed id' })
    }else if(error.name === 'ValidationError'){
        return response.status(400).json({ 'error': error.message })
    }
    next(error)
}

module.exports = { requestLogger, unknownEndPoint, errorHandler }