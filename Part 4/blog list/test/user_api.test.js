const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./userHelper')
const User = require('../models/user')
const bcrypt = require('bcrypt')



const api = supertest(app)


describe('Adding users', () => {
    beforeAll(async () => {
        await User.deleteMany({})

        for(let user of helper.initialUsers){
            const passwordHass = await bcrypt.hash(user.password, 10)
            const requiredUser = new User({ username:user.username, name: user.name, passwordHass })
            await requiredUser.save()
        }
    })


    test('Succeeds with Fresh new user', async () => {
        const usersAtStart = await helper.usersIndB()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }
        await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersIndB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
    test('Users with missing username or password not created', async () => {
        const usersAtStart = await helper.usersIndB()
        const newuser = {
            'usename': '',
            'name': 'trial Name',
            'password': ''
        }

        const result = await api.post('/api/users').send(newuser).expect(401)
        const usersAtEnd = await helper.usersIndB()

        expect(result.body.error).toBe('Missing password or username')
        expect(usersAtStart).toHaveLength(usersAtEnd.length)
    })

    test('Users with password length less than 3 not created', async () => {
        const usersAtStart = await helper.usersIndB()

        const newUser = {
            'username': 'Trial Username',
            'name': 'Trial Name',
            'password': 'tr'
        }

        const result = await api.post('/api/users').send(newUser).expect(401)
        const usersAtEnd = await helper.usersIndB()

        expect(result.body.error).toBe('Password too short')
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Users with username length less than 3 not created', async () => {
        const usersAtStart = await helper.usersIndB()

        const newUser = {
            'username': 'Tr',
            'name': 'Trial Name',
            'password': 'Trial Password'
        }

        const result = await api.post('/api/users').send(newUser).expect(400)
        const usersAtEnd = await helper.usersIndB()

        expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Username to be unique', async () => {
        const usersAtStart = await helper.usersIndB()
        const user = helper.initialUsers[0]

        const newUser = {
            'username': user.username,
            'name': user.name,
            'password' : user.password
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersIndB()

        expect(result.body.error).toContain('expected `username` to be unique')
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('Getting users', () => {
    beforeAll(async () => {
        await User.deleteMany({})

        for(let user of helper.initialUsers){
            const passwordHass = await bcrypt.hash(user.password, 10)
            const requiredUser = new User({ username:user.username, name: user.name, passwordHass })
            await requiredUser.save()
        }
    })


    test('Correct number of users returned', async () => {
        const response = await api.get('/api/users/')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
})


afterAll(
    () => {
        mongoose.connection.close()
    })