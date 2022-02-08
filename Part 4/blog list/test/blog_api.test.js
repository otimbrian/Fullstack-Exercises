const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blogHelper')


const api = supertest(app)

var login = ''
beforeEach(
    async () => {
        await Blog.deleteMany({})

        for(let blog of helper.initialBlogs){
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
    login = await api.post('/api/login').send({
            'username' : 'Otimbrian',
            'password' : 'otimbrian'
        })

    })

describe('When there are blogs initially', () => {
    test('Blogs are returned as JSON', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length)
    })

})


describe('Adding Blogs', () => {
    test('Succeed if data is valid', async () => {
        const newBlog = {
            'title': 'React.JS for web',
            'author': 'Denny Jolly',
            'url': 'http://localhost/web-frame-work',
            'likes': 15,
        }

        await api.post('/api/blogs')
            .set('Authorization', `bearer ${login.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

        const blogTitles = blogs.map(blog => blog.title)
        expect(blogTitles).toContain(newBlog.title)
    })


    test('Fails with status code 400 if missing title or author', async () => {
        const newBlogNoTitle = {
            'author': 'Denny Jolly',
            'url': 'http://localhost/web-frame-work',
            'likes': 15,
        }

        await api.post('/api/blogs')
            .set('Authorization', `bearer ${login.body.token}`)
            .send(newBlogNoTitle).expect(400)

        const newBlogNoAuthor = {
            'title': 'React.JS for web',
            'url': 'http://localhost/web-frame-work',
            'likes': 15,
        }

        await api.post('/api/blogs')
            .set('Authorization', `bearer ${login.body.token}`)
            .send(newBlogNoAuthor)
            .expect(400)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length)
    })
})
describe('Deleting a blog', () => {
    test('Succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDB()

        await api
            .delete(`/api/blogs/${blogsAtStart[0].id}`)
            .set('Authorization', `bearer ${login.body.token}`)
            .expect(204)
    })

    test('Fails when the id doses not exist', async () => {
        const nonExistingId = helper.nonExistingId()

        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .expect(400)
    })

    test('Fails with status code 400 when an invalid id is given', async () => {
        const invalidId = 'sjshs27377287'

        await api
            .delete(`/api/blogs/${invalidId}`)
            .set('Authorization', `bearer ${login.body.token}`)
            .expect(400)
    })
})

describe('Changing a blog', () => {
    test('Should succeed when a valid id is used', async () => {
        const update = {
            'title': 'React.JS for web',
            'author': 'Denny Jolly',
            'url': 'http://localhost/web-frame-work',
        }

        const blogsAtStart = await helper.blogsInDB()


        await  api.put(`/api/blogs/${blogsAtStart[0].id}`)
            .send(update)
            .expect(200)


        const blogsAfter = await helper.blogsInDB()
        const titles = blogsAfter.map(blog => blog.title)
        expect(titles).toContain(update.title)

    })
})

describe('General cases', () => {

    test('The unique Identifier is id', async () => {
        const blogs = await helper.blogsInDB()

        for(let blog of blogs){
            expect(blog.id).toBeDefined()
        }
    })

    test('Likes default to 0', async () => {
        const newBlog = {
            'title': 'React.JS for web',
            'author': 'Denny Jolly',
            'url': 'http://localhost/web-frame-work',
        }

        const savedBlog = await api.post('/api/blogs')
            .set('Authorization', `bearer ${login.body.token}`)
            .send(newBlog)
        expect(savedBlog.body.likes).toBe(0)
    })
})


afterAll(
    () => {
        mongoose.connection.close()
    }
)