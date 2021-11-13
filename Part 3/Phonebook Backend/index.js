require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.static('build'))
app.use(express.json())
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')


morgan.token('content', getcontent = (req) => {
    return JSON.stringify(req.body)
})


app.use(morgan(`:method :url :status :res[content-length] - :response-time ms - :content `))
const Person = require('./models/person')


app.get('/api/persons', (request, response) => {
    Person.find({}).then(
        result => {
            response.json(result)
        }
    )
})


app.get('/info', (request, response) => {
    const time = new Date()
    Person.find({}).then(
      result => {
          response.send(
              `<div><p>Phonebook has infor for ${result.length} people</p><div>${time}</div></div>`
          )
        }
    )
})

app.get('/api/persons/:id', (request, response) => {
    // console.log(request.params)
    // const id = Number(request.params.id)
    // const pers = persons.find(n => n.id === id)
    Person.findById(request.params.id).then(
        person => {
            if(person === undefined){
                response.json(person)
            }else{
                response.status(400).end()
            }
        }
    )
})

app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // persons = persons.filter(pers => pers.id !== id)
    console.log(request.params.id)
    Person.findByIdAndRemove(request.params.id).then(
        result => {
            response.status(204).end()
        }
    ).catch(error => next(error))
})

const generateId = () => Math.floor((Math.random() * 10000) + 1)


app.post('/api/persons', (request, response) => {
    const body = request.body
    if(body.number === "" && body.name === "" || body.number === "" || body.name === ""){
        return response.status(400).json({
            "Error" : "Name or contact is missing"
        })
    }
    // Person.find({}).then(
    //     persons => {
    //         if(persons.find(pers => pers.name === body.name)){
    //             return response.status(400).json({
    //                 "Error" : "Name already in the phonebook"
    //             })}
    //         }
    // )

    const person = new Person(
        {
            name : body.name,
            number : body.number,
        }
    )
    person.save().then(
        savedPerson => {
            response.json(savedPerson)
        }
    )
})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    console.log(body)

    const person = {
        name : body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new : true}).then(
        updated => {
            response.json(updated)
        }
    ).catch(
        error => {
            next(error)
        }
    )
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    } 
  
    next(error)
  }
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})
