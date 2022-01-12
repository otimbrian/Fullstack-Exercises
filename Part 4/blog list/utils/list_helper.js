// const lodash = require('lodash')
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
    var value = 0
    // returns the author who has the largest amount of blogs
    // {
    //     author: "Robert C. Martin",
    //     blogs: 3
    //   }
    const names = blogs.map(blog => {
        return blog.author
    })
    const authorList = blogs.reduce((name, blog) => {
        return name[blog['author']]
            ? ++name[blog['author']]
            : name[blog['author']] = 1, name
    }, [])
    names.forEach( name => {
        if(authorList[name] > value){
            value = authorList[name]
        }
    }
    )
    const requiredAuthor = names.filter(
        name => {
            return authorList[name] === value
        }
    )

    console.log('Most number of Blog: ' , value)
    console.log('author List: ' , authorList)
    console.log('Author names: ', names)
    console.log('Author with most blogs : ',requiredAuthor)

    const mostPub = {
        'author' : requiredAuthor[0],
        'Blogs': value
    }
    console.log(mostPub)
    return mostPub
}

const mostLikes = (blogs) => {
    var likeValue = 0
    // returns the author, whose blog posts have the largest amount of likes
    // {
    //     author: "Edsger W. Dijkstra",
    //     likes: 17
    //   }
    const names = blogs.map(
        blog => {
            return blog.author
        }
    )
    const mostLikedAuthor = blogs.reduce((result, blog) => {
        return result[blog['author']]
            ? result[blog['author']] += blog['likes']
            : result[blog['author']] = blog['likes'], result
    }, [])
    console.log('List of authors and likes: ', mostLikedAuthor)

    names.forEach(name => {
        if(mostLikedAuthor[name] > likeValue){
            likeValue = mostLikedAuthor[name]
        }
    })
    console.log('Author Names: ', names)

    const requiredName = names.filter(
        name => {
            return mostLikedAuthor[name] === likeValue
        }
    )

    console.log('Most liked author : ', requiredName)

    const requiredResult = {
        'author' : requiredName[0],
        'likes' : likeValue
    }

    console.log(requiredResult)
    return requiredResult
}

module.exports = { dummy, totalLike, favouriteBlog, mostBlogs, mostLikes }