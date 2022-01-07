
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLike = (blogs) => {
    var sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
    return blogs.length === 0
        ? 0
        : sum
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
module.exports = { dummy, totalLike, favouriteBlog }