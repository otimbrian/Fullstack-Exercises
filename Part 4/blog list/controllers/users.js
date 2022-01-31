const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHass = await bcrypt.hash(body.password, saltRounds)

    console.log(body)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHass
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users.map(user  => user.toJSON()))
})
module.exports = userRouter