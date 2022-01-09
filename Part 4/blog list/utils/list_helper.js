
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLike = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((total, blog) => {
            return total + blog.likes
        }, 0)
}



const favouriteBlog = (blogs) => {
    var value = 0
    blogs.forEach(
        blog => {
            if(blog.likes > value){
                value = blog.likes
            }
        }
    )
    console.log(value)
    const result =  blogs.filter(
        blog => {
            return blog.likes === value
        }
    )
    console.log(result)
    return result
}

const mostBlogs = (blogs) => {
    // returns the author who has the largest amount of blogs
    // {
    //     author: "Robert C. Martin",
    //     blogs: 3
    //   }
    return blogs
}

const mostLikes = (blogs) => {
    // returns the author, whose blog posts have the largest amount of likes
    // {
    //     author: "Edsger W. Dijkstra",
    //     likes: 17
    //   }
    return blogs
}

module.exports = { dummy, totalLike, favouriteBlog, mostBlogs, mostLikes }