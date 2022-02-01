const User = require('../models/user')


const initialUsers = [
    {
        username: 'username',
        name: 'otimbrian',
        password: 'username'
    },
    {
        username: 'trialusername',
        name: 'otim',
        password: 'trialusername'
    },
    {
        username: 'new Name',
        name: 'otim',
        password: 'new Name'
    }
]

const usersIndB = async () =>  {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { initialUsers, usersIndB }