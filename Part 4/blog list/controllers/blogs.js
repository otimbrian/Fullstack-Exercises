const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try{
        const blogs = await Blog.find({})
            .populate('user', { username: 1, name: 1 })
        response.json(blogs.map(blog => blog.toJSON()))
    }catch{
        exception => next(exception)
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const users = await User.find({})
    const randomNumber = Math.floor(Math.random(0, 10) * users.length)
    const user = users[randomNumber]
    console.log(user)

    const blog = new Blog({
        'title' : body.title,
        'author' : body.author,
        'user': user.id,
        'url' : body.url,
        'likes' : body.likes
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        'title' : body.title,
        'author' : body.author,
        'url' : body.url,
        'likes' : body.likes
    }

    const upDatedBlogs = await Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
    response.json(upDatedBlogs.toJSON())
})

module.exports = blogsRouter