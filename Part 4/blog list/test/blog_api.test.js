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

test('Likes default to 0', async () => {
    const newBlog = {
        'title': 'React.JS for web',
        'author': 'Denny Jolly',
        'url': 'http://localhost/web-frame-work',
    }

    const savedBlog = await api.post('/api/blogs').send(newBlog)
    expect(savedBlog.body.likes).toBe(0)
})

test('Blogs with missing title or author cannot be created', async () => {
    const newBlogNoTitle = {
        'author': 'Denny Jolly',
        'url': 'http://localhost/web-frame-work',
        'likes': 15,
    }

    await api.post('/api/blogs').send(newBlogNoTitle).expect(400)

    const newBlogNoAuthor = {
        'title': 'React.JS for web',
        'url': 'http://localhost/web-frame-work',
        'likes': 15,
    }

    await api.post('/api/blogs').send(newBlogNoAuthor).expect(400)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(
    () => {
        mongoose.connection.close()
    }
)