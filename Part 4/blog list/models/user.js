const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        unique: true,
        required : true,
        minlength : 3
    },
    name: String,
    passwordHass : {
        type: String,
        required: true
    }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHass
    }
})

module.exports = mongoose.model('User', userSchema)