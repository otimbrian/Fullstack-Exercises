const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try{
        const blogs = await Blog.find({})
        response.json(blogs)
    }catch{
        exception => next(exception)
    }
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
    //     .catch(
    //         error => next(error)
    //     )
})

blogsRouter.post('/', async (request, response, next) => {
    // const body = new Blog(request.body)
    const body = request.body

    const blog = new Blog({
        'title' : body.title,
        'author' : body.author,
        'url' : body.url,
        'likes' : body.likes
    })

    try{
        const savedBlog = await blog.save()
        response
            .status(201)
            .json(savedBlog)
    }catch{
        exception => next(exception)
    }

    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
    //     .catch(
    //         error => next(error)
    //     )
})

module.exports = blogsRouter