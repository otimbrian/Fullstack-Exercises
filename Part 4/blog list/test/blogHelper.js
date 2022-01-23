const Blog = require('../models/blog')

const initialBlogs = [
    {
        'title': 'Welcome to Nature',
        'author': 'Otim Brian',
        'url': 'http://localhost',
        'likes': 20,
    },
    {
        'title': 'This is the world',
        'author': 'Edwin Huble',
        'url': 'http://localhost/getting-to-the-stars',
        'likes': 50,
    },
]


const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDB }