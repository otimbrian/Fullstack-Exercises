const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// const getToken = request => {
//     const authorization = request.get('authorization')

//     if(authorization && authorization.toLowerCase().startsWith('bearer')){
//         return authorization.substring(7)
//     }
//     return null
// }

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
    const user = request.user
    // const token = getToken(request)
    // const users = await User.find({})
    // const randomNumber = Math.floor(Math.random(0, 10) * users.length)

    const blog = new Blog({
        'title' : body.title,
        'author' : body.author,
        'user': user.id,
        'url' : body.url,
        'likes' : body.likes
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    // await user.save()
    await User.findByIdAndUpdate(user.id, user)
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === request.user.id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }else{
        response.status(401).json({ Error : 'Do not Have permission to delete this blog' })
    }

    console.log(blog.user.toString(), request.user.id.toString())
    // // await Blog.findByIdAndDelete(request.params.id)
    // response.status(204).end()
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