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
    }else if(error.name === 'JsonWebTokenError'){
        return response.status(401).json({ Error: 'Missing or invalid token' })
    }else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'Token expired' })
    }
    next(error)
}

// const getToken = request => {
//     const authorization = request.get('authorization')

//     if(authorization && authorization.toLowerCase().startsWith('bearer')){
//         return authorization.substring(7)
//     }
//     return null
// }
const tokenExtrator = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        request.token = authorization.substring(7)
    }else{
        request.token =  null
    }
    next()

}
module.exports = { requestLogger, unknownEndPoint, errorHandler, tokenExtrator }