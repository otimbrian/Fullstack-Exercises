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


test('Blogs are returned as JSON', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('The unique Identifier is id', async () => {
    const blogs = await helper.blogsInDB()

    for(let blog of blogs){
        expect(blog.id).toBeDefined()
    }
})

test('New blog is added', async () => {
    const newBlog = {
        'title': 'React.JS for web',
        'author': 'Denny Jolly',
        'url': 'http://localhost/web-frame-work',
        'likes': 15,
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogs.map(blog => blog.title)
    expect(blogTitles).toContain(newBlog.title)
})

afterAll(
    () => {
        mongoose.connection.close()
    }
)