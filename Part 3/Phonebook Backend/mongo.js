mongoose = require('mongoose')


console.log(process.argv)
if(process.argv.length < 3){
    console.log('Please provide password!')
    process.exit()
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.ue16q.mongodb.net/Phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(result => {
        console.log("Added", person.name, person.number, "to phonebook")
        mongoose.connection.close()
    })
}


if(process.argv.length === 3){
    Person.find({}).then(
        result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            }
                )
                mongoose.connection.close()
            }  
    )
}
    
