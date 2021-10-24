const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const morgan = require('morgan')


morgan.token('content', getcontent = (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms - :content `))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.get('/info', (request, response) => {
  const time = new Date()
  response.send(
    `<div><p>Phonebook has infor for ${persons.length} people</p><div>${time}</div></div>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    console.log(request.params)
    const id = Number(request.params.id)
    const pers = persons.find(n => n.id === id)
    if(pers){
        response.json(pers)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(pers => pers.id !== id)

    response.status(204).end()
    console.log(persons)

})

const generateId = () => Math.floor((Math.random() * 10000) + 1)


app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.number && !body.name || !body.number || !body.name){
        return response.status(400).json({
            "Error" : "Name or contact is missing"
        })
    }
    else if(persons.find(pers => pers.name === body.name)){
        return response.status(400).json({
            "Error" :"Name already in the phonebook"
        })
    }
    const person = {
        id: generateId(),
        name : body.name,
        number : body.number,
    }
    persons = persons.concat(person)
    response.json(person)

})


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`The server is running on port ${PORT}`)
