const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blogHelper')


const api = supertest(app)


beforeEach(
    async () => {
        await Blog.deleteMany({})

        for(let blog of helper.initialBlogs){
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
    })


test('Notes are returned as JSON', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(
    () => {
        mongoose.connection.close()
    }
)