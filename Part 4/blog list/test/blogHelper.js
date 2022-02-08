const Blog = require('../models/blog')
// const login = require('../controllers/login')

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

const nonExistingId = async () => {
    const blog = new Blog(
        {
            'title' : 'Unknown Title',
            'author' : 'Unknown author',
            'url' : 'http://local/unknown'
        })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}
const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

// const getToken = async () => {
//     const token = await api.post
// }

module.exports = { initialBlogs, blogsInDB, nonExistingId }